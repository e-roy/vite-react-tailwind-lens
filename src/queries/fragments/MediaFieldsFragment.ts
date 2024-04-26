import { gql } from "@apollo/client";

export const MediaFieldsFragment = gql`
  fragment MediaFieldsFragment on Image {
    mimeType
    width
    height
    uri
  }
`;
