import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
  mutation ($request: CreateProfileWithHandleRequest!) {
    createProfileWithHandle(request: $request) {
      ... on RelaySuccess {
        txHash
        txId
      }
      ... on CreateProfileWithHandleErrorResult {
        reason
      }
    }
  }
`;
