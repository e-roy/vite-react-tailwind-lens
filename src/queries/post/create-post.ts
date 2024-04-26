import { gql } from "@apollo/client/core";

export const CREATE_POST_TYPED_DATA = gql`
  mutation ($request: OnchainPostRequest!) {
    createOnchainPostTypedData(request: $request) {
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
          Post {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          actionModules
          actionModulesInitDatas
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`;
