import React from "react";
import { UserIcon } from "@heroicons/react/outline";
import { Profile } from "@/generated/graphqlGenerated";

type AvatarProps = {
  profile?: Profile;
  size?: string;
};

export const Avatar = React.memo(
  ({ profile, size = "h-24 w-24" }: AvatarProps) => {
    if (!profile) return null;

    const metadata = profile.metadata;

    if (!metadata) {
      return <UserIcon className={`${size} md rounded-full relative`} />;
    }

    const picture = metadata.picture;

    if (picture?.__typename === "ImageSet") {
      const optimizedUri = picture.optimized?.uri;
      if (optimizedUri) {
        return (
          <img
            src={checkIpfs(optimizedUri)}
            alt={`@${profile.handle}`}
            className={`${size} md rounded-full relative`}
          />
        );
      }
    }

    if (picture?.__typename === "NftImage") {
      const rawUri = picture.image.raw.uri;
      if (rawUri) {
        return (
          <img
            src={rawUri}
            alt={`@${profile.handle}`}
            className={`${size} md rounded-full relative`}
          />
        );
      }
    }

    return null;
  }
);

const checkIpfs = (url: string) => {
  if (url.startsWith("ipfs://")) {
    const ipfs = url.replace("ipfs://", "");
    return `https://ipfs.infura.io/ipfs/${ipfs}`;
  }
  return url;
};
