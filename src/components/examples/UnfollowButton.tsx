import React, { useState } from "react";

import { useSignTypedData, useSigner } from "wagmi";
import { omit, splitSignature } from "@/lib/apollo/helpers";
import { ethers } from "ethers";

import { useMutation } from "@apollo/client";
import { CREATE_UNFOLLOW_TYPED_DATA } from "@/queries/profile/unfollow";

import LENS_ABI from "@/abis/Lens-Hub.json";

interface FollowButtonProps {
  profileId: string;
  refetch: () => void;
}

export const UnfollowButton = ({ profileId, refetch }: FollowButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: signerData } = useSigner();

  const { signTypedDataAsync } = useSignTypedData();

  const [createUnfollowTypedData, {}] = useMutation(
    CREATE_UNFOLLOW_TYPED_DATA,
    {
      onCompleted({ createUnfollowTypedData }: any) {
        if (!createUnfollowTypedData) console.log("createUnFollow is null");

        const { typedData } = createUnfollowTypedData;
        const { tokenId } = typedData?.value;
        const { verifyingContract } = typedData?.domain;

        signTypedDataAsync({
          domain: omit(typedData?.domain, "__typename"),
          types: omit(typedData?.types, "__typename"),
          value: omit(typedData?.value, "__typename"),
        }).then((res) => {
          const { v, r, s } = splitSignature(res);
          const followContract = new ethers.Contract(
            verifyingContract,
            LENS_ABI,
            signerData as ethers.Signer
          );
          const sig = {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          };
          const excuteContract = async () => {
            const tx = await followContract.burnWithSig(tokenId, sig);
            tx.wait(1)
              .then(() => {
                refetch();
                setIsUpdating(false);
              })
              .catch((error: any) => {
                console.log(error);
                setIsUpdating(false);
              });
          };
          return excuteContract();
        });
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const handleUnfollow = () => {
    setIsUpdating(true);
    createUnfollowTypedData({
      variables: {
        request: {
          profile: profileId,
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
          onClick={() => handleUnfollow()}
          className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 hover:border-purple-800 hover:text-purple-500 px-4 py-1  items-center hover:shadow-lg"
        >
          UNFOLLOW
        </button>
      )}
    </>
  );
};
