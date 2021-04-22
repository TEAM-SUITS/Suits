import React from "react";
import Icon from "components/Icon/Icon";
import styled from "styled-components";
import { spoqaMedium, spoqaSmall } from "styles/common/common.styled";
import { string } from "prop-types";

/* ---------------------------- styled components ---------------------------- */

const AlertContainer = styled.div.attrs({ role: "alert" })`
  text-align: center;
  color: var(--color-gray3);
  ${spoqaSmall}
  color: ${({ status }) =>
    (status === "error" && "#7c1c24") ||
    (status === "success" && "#0d2e14") ||
    (status === "info" && "black")};
  background-color: ${({ status }) =>
    (status === "error" && "#f5d0d3") ||
    (status === "success" && "#c4e6cc") ||
    (status === "info" && "#e9e9e9")};
  border-radius: 3px;
  border: ${({ status }) =>
    status === "info" ? "none" : "1px solid currentColor"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100%;

  p {
    margin-left: 5px;
    ${spoqaMedium}
    color: var(--color-gray3);
  }
`;

/* -------------------------------------------------------------------------- */

export default function Alert({ status, message }) {
  return (
    <AlertContainer status={status}>
      {status !== "info" && (
        <Icon type={status === "error" ? "error" : "success"} />
      )}
      <p>{message}</p>
    </AlertContainer>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Alert.propTypes = {
  status: string,
  message: string,
};
