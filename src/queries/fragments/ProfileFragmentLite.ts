import { gql } from "@apollo/client";

import { ImageSetFragment } from "./ImageSetFragment";

export const ProfileFragmentLite = gql`
  fragment ProfileFragmentLite on Profile {
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
  }
  ${ImageSetFragment}
`;
