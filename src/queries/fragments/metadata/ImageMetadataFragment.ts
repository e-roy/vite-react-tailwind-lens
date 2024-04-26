// fragments/metadata/ImageMetadataFragment

import { gql } from "@apollo/client";
import { ImageSetFragment } from "../ImageSetFragment";

export const ImageMetadataFragment = gql`
  fragment ImageMetadataFragment on ImageMetadataV3 {
    id
    appId
    title
    content
    locale
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
    asset {
      image {
        optimized {
          mimeType
          width
          height
          uri
        }
        raw {
          mimeType
          width
          height
          uri
        }
      }
    }
    attributes {
      type
      key
      value
    }
  }
  ${ImageSetFragment}
`;
