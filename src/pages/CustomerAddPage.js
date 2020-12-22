import "../App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import { ADD_CUSTOMER, DELETE_CUSTOMERS } from "../graphql/mutations";
import CustomerItem from "../components/customeritem";
import styled from "styled-components";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CSVReader from "react-csv-reader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0px auto 0px auto;
`;

const CustomerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto 0px auto;
`;

const CsvBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 40px auto 0px auto;

  p {
    margin-right: 10px;
  }
`;
const FormikBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 40px auto 0px auto;
`;
const CustomerAddButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 40px auto 0px auto;
  button {
    cursor: pointer;
    background-color: #1c7293;
    color: white;
    width: 100%;
    height: 40px;
    margin: 20px;
    border: none;
    border-radius: 5px;
    outline: none;
    &:hover {
      background-color: #1f8db8;
    }
  }
`;
function CustomerAddPage() {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS);
  const [addone, setaddone] = useState(false);
  const [addmultiple, setaddmultiple] = useState(false);
  const [deletecustomer, setdeletecustomer] = useState(false);
  const [
    addCustomer,
    { loading: mutationLoading, error: mutationError, data: customerdata },
  ] = useMutation(ADD_CUSTOMER);
  const [
    deleteCustomers,
    { loading: deleteLoading, error: deleteError, data: deletemessage },
  ] = useMutation(DELETE_CUSTOMERS);

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.replace(/\W/g, "_"),
  };

  const handleCSV = async (data, fileInfo) => {
    await addCustomer({ variables: { newcustomers: data } });
    toast.success("succesfully added customers to list", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    refetch();
  };

  const handleCustomerClick = (userid) => {
    history.push("/user", { params: userid });
  };

  const deleteAllCustomers = async () => {
    const ids = data.customers.map(({ id }) => {
      return id;
    });

    await deleteCustomers({
      variables: {
        ids: ids,
      },
    });
    refetch();
  };
  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <ToastContainer />
      {!addmultiple && !addone && !deletecustomer && (
        <CustomerAddButtons>
          <button onClick={() => setaddone(true)}>Add Customer</button>
          <button onClick={() => setaddmultiple(true)}>Add Customers</button>
          <button onClick={deleteAllCustomers}>Delete all</button>
        </CustomerAddButtons>
      )}

      {addmultiple && (
        <>
          <CsvBox>
            <p>Upload .CSV file:</p>
            <CSVReader
              cssClass="csv-reader-input"
              onFileLoaded={handleCSV}
              parserOptions={parseOptions}
              inputId="csvId"
              inputStyle={{ color: "black" }}
            />
          </CsvBox>
          {mutationLoading && <p>Processing and uploading data...</p>}
          {mutationError && <p>Error, Please try again</p>}
        </>
      )}
      {addone && (
        <>
          <FormikBox>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
              }}
              validationSchema={CustomerSchema}
              onSubmit={(values) => {
                console.log(values);
                addCustomer({ variables: { newcustomers: [values] } });
                toast.success("succesfully added customer to list", {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                refetch();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" />

                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" />

                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
            {mutationLoading && <p>Processing and uploading data...</p>}
            {mutationError && <p>Error, Please try again</p>}
          </FormikBox>
        </>
      )}

      <CustomerHeader>
        <CustomerItem
          key={"header"}
          id={"ID"}
          firstName={"firstName"}
          lastName={"lastName"}
          email={"email"}
          customerSince={"customerSince"}
        ></CustomerItem>
      </CustomerHeader>
      <CustomerTable>
        {data.customers.map(
          ({ id, firstName, lastName, email, customerSince }) => (
            <CustomerItem
              handleCustomerClick={handleCustomerClick}
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
              email={email}
              customerSince={customerSince}
            ></CustomerItem>
          )
        )}
      </CustomerTable>
    </>
  );
}

export default CustomerAddPage;
