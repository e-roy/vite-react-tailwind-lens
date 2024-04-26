import { gql } from "@apollo/client";

import { ProfileFragmentFull } from "../fragments/ProfileFragmentFull";

export const GET_PROFILES = gql`
  query ($request: ProfilesRequest!) {
    profiles(request: $request) {
      items {
        ...ProfileFragmentFull
      }
    }
  }
  ${ProfileFragmentFull}
`;
