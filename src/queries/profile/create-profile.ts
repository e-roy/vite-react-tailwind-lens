import { gql } from "@apollo/client";

// export const CREATE_PROFILE = gql`
//   mutation ($request: CreateProfileRequest!) {
//     createProfile(request: $request) {
//       ... on RelayerResult {
//         txHash
//       }
//       ... on RelayError {
//         reason
//       }
//       __typename
//     }
//   }
// `;

// export const CREATE_PROFILE = gql`
//   mutation ($request: CreateProfileRequest!) {
//     createProfile(request: $request) {
//       txHash
//       txId
//     }
//   }
// `;

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
