import React from "react";
import Icon from "components/Icon/Icon";
import styled from "styled-components";
import { spoqaSmall } from "styles/common/common.styled";
import { string } from "prop-types";

/* ---------------------------- styled components ---------------------------- */

const AlertContainer = styled.div.attrs({ role: "alert" })`
  ${spoqaSmall}
  color: ${({ status }) => (status === "error" ? "#7c1c24" : "#0d2e14")};
  background-color: ${({ status }) =>
    status === "error" ? "#f5d0d3" : "#c4e6cc"};
  border-radius: 3px;
  border: 1px solid currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;

  p {
    margin-left: 5px;
  }
`;

/* -------------------------------------------------------------------------- */

export default function Alert({ status, message }) {
  return (
    <AlertContainer status={status}>
      <Icon type={status === "error" ? "error" : "success"} />
      <p>{message}</p>
    </AlertContainer>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Alert.propTypes = {
  status: string,
  message: string,
};
