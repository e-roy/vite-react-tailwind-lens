import { gql } from "@apollo/client";

import { PostFragment } from "./fragments/PostFragment";
import { QuoteFragment } from "./fragments/QuoteFragment";

export const EXPLORE_PUBLICATIONS = gql`
  query ($request: ExplorePublicationRequest!) {
    explorePublications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFragment
        }
        ... on Quote {
          ...QuoteFragment
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
  ${PostFragment}
  ${QuoteFragment}
`;
