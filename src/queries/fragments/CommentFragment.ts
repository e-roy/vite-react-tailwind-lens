import { gql } from "@apollo/client";

import { ProfileFragmentLite } from "./ProfileFragmentLite";
import { PostFragment } from "./PostFragment";
import { MediaFieldsFragment } from "./MediaFieldsFragment";

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id

    profile {
      ...ProfileFragmentLite
    }

    metadata {
      name
      description
      content
      image
      media {
        original {
          ...MediaFieldsFragment
        }
      }
    }
    mainPost {
      ... on Post {
        ...PostFragment
      }
      ... on Mirror {
        id
        metadata {
          name
          description
          content
          image
          media {
            original {
              ...MediaFieldsFragment
            }
          }
        }
        profile {
          ...ProfileFragmentLite
        }
      }
    }
    commentOn {
      ... on Post {
        id
        profile {
          handle
        }
      }
      ... on Comment {
        id
        profile {
          handle
        }
      }
      ... on Mirror {
        id
        profile {
          handle
        }
      }
    }

    stats {
      totalAmountOfMirrors
      totalAmountOfCollects
      totalAmountOfComments
    }
    createdAt
    appId
  }
  ${ProfileFragmentLite}
  ${PostFragment}
  ${MediaFieldsFragment}
`;
