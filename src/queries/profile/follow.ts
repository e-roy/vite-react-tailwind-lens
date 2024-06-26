import { gql } from "@apollo/client/core";

export const CREATE_FOLLOW_TYPED_DATA = gql`
  mutation ($request: FollowRequest!) {
    createFollowTypedData(request: $request) {
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
          Follow {
            name
            type
          }
        }
        value {
          nonce
          deadline
          followerProfileId
          idsOfProfilesToFollow
          followTokenIds
          datas
        }
      }
    }
  }
`;
