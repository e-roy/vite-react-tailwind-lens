import React, { useState } from "react";

import {
  useSignTypedData,
  useContractWrite,
  useAccount,
  usePrepareContractWrite,
} from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";

import { useMutation } from "@apollo/client";
import { CREATE_FOLLOW_TYPED_DATA } from "@/queries/profile/follow";

import LENS_ABI from "@/abis/Lens-Hub.json";
import { LENS_HUB_PROXY_ADDRESS } from "@/constants";
import { CreateFollowBroadcastItemResult } from "@/generated/graphqlEden";

interface FollowButtonProps {
  profileId: string;
  refetch: () => void;
}

export const FollowButton = ({ profileId, refetch }: FollowButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { config } = usePrepareContractWrite({
    address: LENS_HUB_PROXY_ADDRESS,
    abi: LENS_ABI,
    functionName: "followWithSig",
  });
  const { data, isLoading, isSuccess, writeAsync, write } =
    useContractWrite(config);

  const [createFollowTypedData, {}] = useMutation(CREATE_FOLLOW_TYPED_DATA, {
    onCompleted({
      createFollowTypedData,
    }: {
      createFollowTypedData: CreateFollowBroadcastItemResult;
    }) {
      if (!createFollowTypedData) console.log("createFollow is null");

      const { typedData } = createFollowTypedData;
      const { profileIds, datas } = typedData?.value;

      console.log("typedData", typedData);

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const sig = { v, r, s, deadline: typedData?.value.deadline };
        const postARGS = {
          follower: address as string,
          profileIds,
          datas,
          sig,
          // sig: {
          //   v,
          //   r,
          //   s,
          //   deadline: typedData.value.deadline,
          // },
        };
        write && write({ args: postARGS });

        // writeAsync &&
        //   writeAsync({ args: postARGS })
        //     .then((res) => {
        //       console.log("res", res);
        //       res.wait(1).then(() => {
        //         refetch();
        //         setIsUpdating(false);
        //       });
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //       setIsUpdating(false);
        //     });
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleFollow = async () => {
    setIsUpdating(true);
    createFollowTypedData({
      variables: {
        request: {
          follow: { profile: profileId },
        },
      },
    });
  };

  return (
    <>
      {isUpdating ? (
        <div className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 px-4 py-1 items-center hover:shadow-lg">
          UPDATING
        </div>
      ) : (
        <button
          onClick={() => handleFollow()}
          className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 hover:border-purple-800 hover:text-purple-500 px-4 py-1  items-center hover:shadow-lg"
        >
          FOLLOW
        </button>
      )}
    </>
  );
};
