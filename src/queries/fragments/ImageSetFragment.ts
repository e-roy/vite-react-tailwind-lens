import { gql } from "@apollo/client";
import { MediaFieldsFragment } from "./MediaFieldsFragment";

export const ImageSetFragment = gql`
  fragment ImageSetFragment on ImageSet {
    optimized {
      ...MediaFieldsFragment
    }
    raw {
      ...MediaFieldsFragment
    }
  }
  ${MediaFieldsFragment}
`;
