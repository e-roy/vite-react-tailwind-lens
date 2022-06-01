import { gql } from "@apollo/client";

import { MediaFieldsFragment } from "./MediaFieldsFragment";

export const ProfileFragmentFull = gql`
  fragment ProfileFragmentFull on Profile {
    id
    handle
    name
    bio
    ownedBy
    picture {
      ... on MediaSet {
        original {
          ...MediaFieldsFragment
        }
      }
      ... on NftImage {
        tokenId
        uri
        verified
      }
    }
    coverPicture {
      ... on NftImage {
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFieldsFragment
        }
      }
      __typename
    }
    attributes {
      displayType
      traitType
      key
      value
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            symbol
            name
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
  ${MediaFieldsFragment}
`;
