import React, { useState } from "react";
import { useAccount, useSignTypedData, useWriteContract } from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_UNFOLLOW_TYPED_DATA } from "@/queries/profile/unfollow";
import { LensHub } from "@/abis/LensHub";
import { LENS_HUB_PROXY_ADDRESS } from "@/constants";

interface UnfollowArgs {
  unfollowerProfileId: string;
  idsOfProfilesToUnfollow: string[];
  signature: {
    signer: string;
    v: number;
    r: string;
    s: string;
    deadline: string;
  };
}

interface FollowButtonProps {
  profileId: string;
  refetch: () => void;
}

export const UnfollowButton = ({ profileId, refetch }: FollowButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { address } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();

  const { writeContractAsync } = useWriteContract();

  const write = async (args: UnfollowArgs) => {
    try {
      const res = await writeContractAsync({
        address: LENS_HUB_PROXY_ADDRESS,
        abi: LensHub,
        functionName: "unfollow",
        args: [args.unfollowerProfileId, args.idsOfProfilesToUnfollow],
      });
      return res;
    } catch (error) {
      console.error("Error writing contract:", error);
      throw error;
    } finally {
      setIsUpdating(false);
      refetch();
    }
  };

  const [createUnfollowTypedData] = useMutation(CREATE_UNFOLLOW_TYPED_DATA, {
    onCompleted({ createUnfollowTypedData }) {
      if (!createUnfollowTypedData) {
        console.log("createUnFollow is null");
        return;
      }
      const { typedData } = createUnfollowTypedData;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        primaryType: "Unfollow",
        message: omit(typedData?.value, "__typename"),
      })
        .then((res) => {
          const { v, r, s } = splitSignature(res);

          const unfollowArgs: UnfollowArgs = {
            unfollowerProfileId: typedData.value.unfollowerProfileId,
            idsOfProfilesToUnfollow: typedData.value.idsOfProfilesToUnfollow,
            signature: {
              signer: address!,
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          };

          // console.log("unfollowArgs:", JSON.stringify(unfollowArgs, null, 2));

          write(unfollowArgs);
        })
        .catch((error) => {
          console.error("Error signing typed data:", error);
        });
    },
    onError(error) {
      console.error("Error creating unfollow typed data:", error);
    },
  });

  const handleUnfollow = () => {
    setIsUpdating(true);
    createUnfollowTypedData({
      variables: {
        request: {
          unfollow: profileId,
        },
      },
    });
  };

  return (
    <button
      onClick={handleUnfollow}
      disabled={isUpdating}
      className={`flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring focus:border-blue-300 rounded max-w-max border px-4 py-1 items-center hover:shadow-lg ${
        isUpdating
          ? "bg-transparent border-purple-400 text-purple-400"
          : "bg-transparent border-purple-400 text-purple-400 hover:border-purple-800 hover:text-purple-500"
      }`}
    >
      {isUpdating ? "UPDATING" : "UNFOLLOW"}
    </button>
  );
};
