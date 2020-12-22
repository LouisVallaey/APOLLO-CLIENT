import React from "react";
import styled from "styled-components";

const CustomerContainer = styled.div`
  background-color: #1c7293;
  display: flex;
  flex-direction: row;
  padding: 5px;
  border: none;
  margin: 5px;
  border-radius: 5px;
`;

const Item = styled.div`
  width: 20vw;
  padding: 2px;

  p {
    margin: 5px;
    word-break: break-all;
    color: white;
  }
`;

const CustomerItem = ({
  handleCustomerClick,
  id,
  firstName,
  lastName,
  email,
  customerSince,
}) => {
  return (
    <>
      <CustomerContainer onClick={() => handleCustomerClick(id)}>
        <Item>
          <p>{id}</p>
        </Item>
        <Item>
          <p>{firstName}</p>
        </Item>
        <Item>
          <p>{lastName}</p>
        </Item>
        <Item>
          <p>{email}</p>
        </Item>
        <Item>
          <p>{customerSince}</p>
        </Item>
      </CustomerContainer>
    </>
  );
};

export default CustomerItem;
