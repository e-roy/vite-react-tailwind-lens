import { gql } from "@apollo/client";

import { PostFragment } from "./fragments/PostFragment";
import { CommentFragment } from "./fragments/CommentFragment";
import { MirrorFragment } from "./fragments/MirrorFragment";

export const EXPLORE_PUBLICATIONS = gql`
  query ($request: ExplorePublicationRequest!) {
    explorePublications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFragment
        }
        ... on Comment {
          ...CommentFragment
        }
        ... on Mirror {
          ...MirrorFragment
        }
      }
      pageInfo {
        next
        totalCount
      }
    }
  }
  ${PostFragment}
  ${CommentFragment}
  ${MirrorFragment}
`;
