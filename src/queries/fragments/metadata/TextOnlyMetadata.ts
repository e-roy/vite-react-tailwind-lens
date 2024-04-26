// fragments/metadata/TextOnlyMetadata.ts

import { gql } from "@apollo/client";
import { ImageSetFragment } from "../ImageSetFragment";

export const TextOnlyMetadata = gql`
  fragment TextOnlyMetadata on TextOnlyMetadataV3 {
    id
    appId
    locale
    content
    rawURI

    marketplace {
      description
      externalURL
      name
      attributes {
        displayType
        traitType
        value
      }
      image {
        ...ImageSetFragment
      }
      animationUrl
    }

    attributes {
      type
      key
      value
    }
  }
  ${ImageSetFragment}
`;
