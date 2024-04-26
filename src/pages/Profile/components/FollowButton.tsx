import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateFollowBroadcastItemResult } from "@/generated/graphqlGenerated";
import { CREATE_FOLLOW_TYPED_DATA } from "@/queries/profile/follow";

import { useAccount, useSignTypedData, useWriteContract } from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";

import { LensHub } from "@/abis/LensHub";
import { LENS_HUB_PROXY_ADDRESS } from "@/constants";

interface FollowButtonProps {
  profileId: string;
  refetch: () => void;
}

interface FollowArgs {
  followerProfileId: string;
  idsOfProfilesToFollow: string[];
  followTokenIds: string[];
  datas: string[];
  signature: {
    signer: string;
    v: number;
    r: string;
    s: string;
    deadline: string;
  };
}

export const FollowButton = ({ profileId, refetch }: FollowButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error: Error) => {
        console.error("Error writing contract:", error);
        setIsUpdating(false);
      },
      onSettled: () => {
        setIsUpdating(false);
        refetch();
      },
    },
  });

  const write = async (args: FollowArgs) => {
    const res = await writeContractAsync({
      address: LENS_HUB_PROXY_ADDRESS,
      abi: LensHub,
      functionName: "follow",
      args: [
        args.followerProfileId,
        args.idsOfProfilesToFollow,
        args.followTokenIds,
        args.datas,
      ],
    });
    return res;
  };

  const [createFollowTypedData] = useMutation<{
    createFollowTypedData: CreateFollowBroadcastItemResult;
  }>(CREATE_FOLLOW_TYPED_DATA, {
    onCompleted({ createFollowTypedData }) {
      if (!createFollowTypedData) {
        console.error("createFollow is null");
        return;
      }

      const { typedData } = createFollowTypedData;

      if (!typedData) {
        console.error("typedData is undefined");
        return;
      }

      signTypedDataAsync({
        domain: omit(typedData.domain, "__typename"),
        types: omit(typedData.types, "__typename"),
        primaryType: "Follow",
        message: omit(typedData.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);

        const followArgs: FollowArgs = {
          followerProfileId: typedData.value.followerProfileId,
          idsOfProfilesToFollow: typedData.value.idsOfProfilesToFollow,
          followTokenIds: typedData.value.followTokenIds,
          datas: typedData.value.datas,
          signature: {
            signer: address!,
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };

        // console.log("followArgs:", JSON.stringify(followArgs, null, 2));

        write(followArgs)
          .then(() => {
            console.log("Followed successfully");
            refetch();
          })
          .catch((error) => {
            console.error("Error following:", error);
          });
      });
    },
    onError(error) {
      console.error("Error creating follow typed data:", error);
    },
  });

  const handleFollow = async () => {
    setIsUpdating(true);
    createFollowTypedData({
      variables: {
        request: {
          follow: [{ profileId }],
        },
      },
    });
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isUpdating}
      className={`flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring focus:border-blue-300 rounded max-w-max border px-4 py-1 items-center hover:shadow-lg ${
        isUpdating
          ? "bg-transparent border-purple-400 text-purple-400"
          : "bg-transparent border-purple-400 text-purple-400 hover:border-purple-800 hover:text-purple-500"
      }`}
    >
      {isUpdating ? "UPDATING" : "FOLLOW"}
    </button>
  );
};
