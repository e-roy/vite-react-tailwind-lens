// fragments/metadata/VideoMetadataFragment

import { gql } from "@apollo/client";
import { ImageSetFragment } from "../ImageSetFragment";

export const VideoMetadataFragment = gql`
  fragment VideoMetadataFragment on VideoMetadataV3 {
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
      video {
        optimized {
          mimeType
          uri
        }
        raw {
          mimeType
          uri
        }
      }
      cover {
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
      duration
      license
      altTag
      attributes {
        type
        key
        value
      }
    }
  }
  ${ImageSetFragment}
`;
