import { gql } from "@apollo/client/core";

export const DOES_FOLLOW = gql`
  query ($request: DoesFollowRequest!) {
    doesFollow(request: $request) {
      followerAddress
      profileId
      follows
    }
  }
`;
