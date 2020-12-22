import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query Customers {
    customers {
      id
      firstName
      lastName
      email
      customerSince
    }
  }
`;

export const GET_CUSTOMER = gql`
  query Customer($id: ID!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
      customerSince
    }
  }
`;
