import { gql } from "@apollo/client";

import { ProfileFragmentFull } from "../fragments/ProfileFragmentFull";

export const GET_PROFILES = gql`
  query ($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        ...ProfileFragmentFull
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
  ${ProfileFragmentFull}
`;
