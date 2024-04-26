import React from "react";
import { useAccount } from "wagmi";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";

import { CreatePost } from "./components/CreatePost";
import { CreateProfile } from "./components/CreateProfile";

import { ENV_PROD, IS_PRODUCTION } from "@/constants";
import { Profile } from "@/generated/graphqlGenerated";

interface ProfilesData {
  profiles: {
    items: Profile[];
  };
}

export const PostPage = () => {
  const { address } = useAccount();
  const {
    data: profileData,
    loading,
    error,
  } = useQuery<ProfilesData>(GET_PROFILES, {
    variables: {
      request: { where: { ownedBy: [address] } },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const { profiles } = profileData!;

  // console.log("profiles", profiles);

  const currentUser = profiles.items[0];

  if (!currentUser)
    return (
      <div>
        <CreateProfile />
      </div>
    );

  if (!currentUser && ENV_PROD && IS_PRODUCTION)
    return (
      <div className="mt-16 mx-auto h-44 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 rounded-lg shadow-lg max-w-2xl">
        You need a profile to post.
      </div>
    );

  return (
    <div>
      <CreatePost currentUser={currentUser} />
    </div>
  );
};
