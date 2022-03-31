import { gql } from "@apollo/client/core";

export const VERIFY = gql`
  query ($request: VerifyRequest!) {
    verify(request: $request)
  }
`;
