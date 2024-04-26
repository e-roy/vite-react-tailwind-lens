import { gql } from "@apollo/client/core";

export const CREATE_UNFOLLOW_TYPED_DATA = gql`
  mutation ($request: UnfollowRequest!) {
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          Unfollow {
            name
            type
          }
        }
        value {
          nonce
          deadline
          unfollowerProfileId
          idsOfProfilesToUnfollow
        }
      }
    }
  }
`;
