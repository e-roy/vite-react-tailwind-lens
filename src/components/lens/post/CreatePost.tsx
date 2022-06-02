import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "@/queries/post/create-post";

import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";

import LENS_ABI from "@/abis/Lens-Hub.json";
import { LENS_HUB_PROXY_ADDRESS } from "@/constants";
import { uploadIpfs } from "@/lib/ipfs/index";
import { Avatar } from "@/components/elements/Avatar";

interface CreatePostProps {
  currentUser: any;
}

export const CreatePost = ({ currentUser }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();
  const { writeAsync } = useContractWrite(
    {
      addressOrName: LENS_HUB_PROXY_ADDRESS,
      contractInterface: LENS_ABI,
    },
    "postWithSig"
  );

  const [createPostTypedData, {}] = useMutation(CREATE_POST_TYPED_DATA, {
    onCompleted({ createPostTypedData }: any) {
      if (!createPostTypedData) console.log("createPost is null");
      const { typedData } = createPostTypedData;
      const {
        profileId,
        contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
      } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res: any) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          profileId,
          contentURI,
          collectModule,
          collectModuleInitData,
          referenceModule,
          referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };
        writeAsync({ args: postARGS }).then((res) => {
          res.wait(1).then(() => {
            setIsPosting(false);
            setContent("");
          });
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
      name: "Post from @" + currentUser?.handle,
      description: content,
      content,
      media: [],
    };
    const result = await uploadIpfs({ payload });
    console.log(result);
    createPostTypedData({
      variables: {
        request: {
          profileId: currentUser.id,
          contentURI: "https://ipfs.infura.io/ipfs/" + result.path,
          collectModule: {
            revertCollectModule: true,
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    });
  };

  if (isPosting) {
    return (
      <div className="mt-16 mx-auto w-10/12 h-60 flex flex-col content-center text-center text-2xl text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
        Posting...
      </div>
    );
  }

  return (
    <div className="mt-16 mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
      <div className="flex">
        <Avatar profile={currentUser} size="h-12 w-12" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=" bg-gray-100 ml-4 p-3 h-60 border border-gray-300 outline-none rounded-lg resize-none w-full"
          placeholder="Create Post"
        ></textarea>
      </div>

      <div className="icons flex text-gray-500 m-2">
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
        <div className=" ml-auto text-gray-400 text-xs font-semibold">
          0/300
        </div>
      </div>
      <div className=" flex">
        <button
          onClick={() => setContent("")}
          className=" border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => handlePost()}
          disabled={!content}
          className=" border border-green-700 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-green-700 rounded"
        >
          Post
        </button>
      </div>
    </div>
  );
};
