import { gql } from "@apollo/client";

import { ImageSetFragment } from "./ImageSetFragment";

export const ProfileFragmentFull = gql`
  fragment ProfileFragmentFull on Profile {
    id

    handle {
      id
      fullHandle
      localName
      namespace
    }

    ownedBy {
      address
      chainId
    }

    metadata {
      appId
      displayName
      bio
      rawURI
      picture {
        ... on ImageSet {
          ...ImageSetFragment
        }
        ... on NftImage {
          collection {
            address
            chainId
          }
          image {
            ...ImageSetFragment
          }
          tokenId
          verified
        }
      }
    }

    stats {
      id
      followers
      following
      comments
      posts
      mirrors
      publications
      quotes
    }

    operations {
      id
      isBlockedByMe {
        value
        isFinalisedOnchain
      }
      hasBlockedMe {
        value
        isFinalisedOnchain
      }
      isFollowedByMe {
        value
        isFinalisedOnchain
      }
      isFollowingMe {
        value
        isFinalisedOnchain
      }
      canBlock
      canUnblock
      canFollow
      canUnfollow
    }
  }
  ${ImageSetFragment}
`;
