import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";
import { useAccount } from "wagmi";
import { Button } from "@/components/elements";

export const GetProfiles = () => {
  const { data: accountData } = useAccount();

  const {
    data: userProfilesData,
    loading: userProfilesLoading,
    error,
    refetch,
  } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: accountData?.address },
    },
  });
  if (userProfilesLoading) return <p>Loading...</p>;

  console.log(userProfilesData);
  return (
    <div>
      <p>{userProfilesData?.getProfiles?.length}</p>
      <Button onClick={() => refetch()}>Refetch</Button>
      {userProfilesData?.profiles?.items.map((profile: any, index: number) => (
        <div key={index} className="border rounded m-2 p-2">
          <p>name: {profile.name}</p>
          <p>id: {profile.id}</p>
        </div>
      ))}
    </div>
  );
};
