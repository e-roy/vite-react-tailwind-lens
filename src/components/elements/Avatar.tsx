import React from "react";
import { UserIcon } from "@heroicons/react/outline";
import { Profile } from "@/generated/graphqlGenerated";

type AvatarProps = {
  profile?: Profile;
  size?: string;
};

export const Avatar = ({ profile, size = "h-24 w-24" }: AvatarProps) => {
  if (!profile) return null;

  // console.log("profile ======>", profile);

  if (!profile.metadata)
    return <UserIcon className={`${size} md rounded-full relative`} />;

  if (profile.metadata?.picture?.__typename === "ImageSet")
    return (
      <img
        src={checkIpfs(profile?.metadata?.picture?.optimized?.uri)}
        alt={`@${profile.handle}`}
        className={`${size} md rounded-full relative`}
      />
    );

  if (profile.metadata?.picture?.__typename === "NftImage")
    return (
      <img
        src={profile?.metadata?.picture?.image.raw.uri}
        alt={`@${profile.handle}`}
        className={`${size} md rounded-full relative`}
      />
    );
};

const checkIpfs = (url: string) => {
  if (url.startsWith("ipfs://")) {
    const ipfs = url.replace("ipfs://", "");
    return `https://ipfs.infura.io/ipfs/${ipfs}`;
  } else return url;
};
