import { gql } from "@apollo/client";

import { MediaFieldsFragment } from "./MediaFieldsFragment";

export const ProfileFragmentLite = gql`
  fragment ProfileFragmentLite on Profile {
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
  }
  ${MediaFieldsFragment}
`;
