import "../App.css";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { GET_CUSTOMER } from "../graphql/queries";
import { UPDATE_CUSTOMER } from "../graphql/mutations";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import CustomerItem from "../components/customeritem";

const FormikBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin: 40px auto 0px auto;
`;

function CustomerPage() {
  const location = useLocation();
  const id = location.state.params;
  const { loading, error, data, refetch } = useQuery(GET_CUSTOMER, {
    variables: { id },
  });
  const [
    updateCustomer,
    { loading: mutationLoading, error: mutationError, data: customerdata },
  ] = useMutation(UPDATE_CUSTOMER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <CustomerItem
        key={data.customer.id}
        id={data.customer.id}
        firstName={data.customer.firstName}
        lastName={data.customer.lastName}
        email={data.customer.email}
        customerSince={data.customer.customerSince}
      ></CustomerItem>
      <FormikBox>
        <Formik
          initialValues={{
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            email: data.customer.email,
          }}
          onSubmit={async (values) => {
            updateCustomer({
              variables: {
                id: data.customer.id,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
              },
            });
          }}
        >
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        {mutationLoading && <p>Processing and uploading data...</p>}
        {mutationError && <p>Error, Please try again</p>}
      </FormikBox>
    </>
  );
}

export default CustomerPage;
