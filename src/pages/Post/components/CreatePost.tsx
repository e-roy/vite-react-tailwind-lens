import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CreateOnchainPostBroadcastItemResult,
  Profile,
} from "@/generated/graphqlGenerated";
import { CREATE_POST_TYPED_DATA } from "@/queries/post/create-post";

import { useAccount, useSignTypedData, useWriteContract } from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";

import { LensHub } from "@/abis/LensHub";
import { LENS_HUB_PROXY_ADDRESS } from "@/constants";

import { uploadIpfs } from "@/lib/ipfs/index";

import { Avatar } from "@/components/elements/Avatar";

interface CreatePostProps {
  currentUser: Profile;
}

interface PostArgs {
  postParams: {
    profileId: string;
    contentURI: string;
    actionModules: any[];
    actionModulesInitDatas: any[];
    referenceModule: string;
    referenceModuleInitData: string;
  };
  signature: {
    signer: string;
    v: number;
    r: string;
    s: string;
    deadline: string;
  };
}

interface CreateOnchainPostTypedDataResult {
  createOnchainPostTypedData: CreateOnchainPostBroadcastItemResult;
}

export const CreatePost: React.FC<CreatePostProps> = ({ currentUser }) => {
  const { address } = useAccount();

  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.log("error", error);
        setIsPosting(false);
      },
    },
  });

  const write = async (args: PostArgs) => {
    const res = await writeContractAsync({
      address: LENS_HUB_PROXY_ADDRESS,
      abi: LensHub,
      functionName: "postWithSig",
      args: [args.postParams, args.signature],
    });
    return res;
  };

  const [createPostTypedData] = useMutation(CREATE_POST_TYPED_DATA, {
    onCompleted({
      createOnchainPostTypedData,
    }: CreateOnchainPostTypedDataResult) {
      if (!createOnchainPostTypedData) {
        console.log("createPost is null");
        return;
      }

      const { typedData } = createOnchainPostTypedData;
      const {
        profileId,
        contentURI,
        referenceModule,
        referenceModuleInitData,
      } = typedData.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        primaryType: "Post",
        message: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);

        const postARGS: PostArgs = {
          postParams: {
            profileId,
            contentURI,
            actionModules: [],
            actionModulesInitDatas: [],
            referenceModule,
            referenceModuleInitData,
          },
          signature: {
            signer: address!,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };

        write(postARGS).then(() => {
          setIsPosting(false);
          setContent("");
        });
      });
    },
    onError(error) {
      console.log(error);
      setIsPosting(false);
    },
  });

  const handlePost = async () => {
    if (!currentUser) return;
    setIsPosting(true);

    const payload = {
      name: "Post from @" + currentUser?.handle?.localName,
      description: content,
      content,
      media: [],
    };

    const result = await uploadIpfs({ payload });
    createPostTypedData({
      variables: {
        request: {
          contentURI: "https://ipfs.infura.io/ipfs/" + result,
        },
      },
    });
  };

  return (
    <div className="mt-16 mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
      {isPosting ? (
        <div className="h-60 flex flex-col content-center text-center text-2xl">
          Posting...
        </div>
      ) : (
        <div className={`space-y-4`}>
          <div className="flex space-x-4">
            <Avatar profile={currentUser} size="h-12 w-12" />
            <div className="font-semibold">
              @{currentUser?.handle?.localName}
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 p-3 h-60 border border-gray-300 outline-none rounded-lg resize-none w-full"
            placeholder="Create Post"
          />

          <div className="flex justify-between">
            <div className="text-gray-400 text-xs font-semibold">
              {content.length}/300
            </div>
            <div className="flex">
              <button
                onClick={() => setContent("")}
                className="border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!content}
                className="border border-green-700 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-green-700 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
