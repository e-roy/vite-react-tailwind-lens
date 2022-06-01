import React from "react";
import { useAccount } from "wagmi";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "@/queries/profile/get-profiles";

import { CreatePost } from "@/components/lens/post";

export const PostPage = () => {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });

  if (!profileData) return null;
  const currentUser = profileData.profiles.items[0];

  if (!currentUser) return <div>You need a lens profile to create a post</div>;

  return (
    <div>
      <CreatePost currentUser={currentUser} />
    </div>
  );
};
