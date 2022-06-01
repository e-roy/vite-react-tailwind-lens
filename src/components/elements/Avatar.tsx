import React from "react";
import { UserIcon } from "@heroicons/react/outline";

type AvatarProps = {
  profile?: any;
  size?: string;
};

export const Avatar = ({ profile, size = "h-24 w-24" }: AvatarProps) => {
  if (!profile) return null;

  if (profile.picture?.__typename === "NftImage") {
    return (
      <img
        src={profile.picture.uri}
        alt={`@${profile.handle}`}
        className={`${size} md rounded-full relative`}
      />
    );
  } else if (profile.picture?.__typename === "MediaSet") {
    return (
      <img
        src={checkIpfs(profile?.picture.original.url)}
        alt={`@${profile.handle}`}
        className={`${size} md rounded-full relative`}
      />
    );
  } else {
    return <UserIcon className={`${size} md rounded-full relative`} />;
  }
};

const checkIpfs = (url: string) => {
  if (url.startsWith("ipfs://")) {
    const ipfs = url.replace("ipfs://", "");
    return `https://ipfs.infura.io/ipfs/${ipfs}`;
  } else return url;
};
