import { gql } from "@apollo/client";

export const ADD_CUSTOMER = gql`
  mutation addCustomer($newcustomers: [InputCustomer]) {
    addCustomer(newcustomers: $newcustomers) {
      success
      customers {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updatecustomer(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateCustomer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      success
      message
      customers {
        id
        customerSince
        firstName
        lastName
        email
      }
    }
  }
`;

export const DELETE_CUSTOMERS = gql`
  mutation deleteCustomer($ids: [ID]!) {
    deleteCustomer(ids: $customers) {
      success
      message
    }
  }
`;
