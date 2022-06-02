import React from "react";
import { useAccount } from "wagmi";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";

import { CreatePost } from "@/components/lens/post";
import { CreateProfile } from "@/components/lens/profile";

import { ENV_PROD, IS_PRODUCTION } from "@/constants";

export const PostPage = () => {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });

  // console.log("profileData", profileData);

  if (!profileData) return null;
  const currentUser = profileData.profiles.items[0];

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
