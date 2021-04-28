import React from "react";
import Icon from "components/Icon/Icon";
import styled from "styled-components";
import {
  museoMedium,
  spoqaSmall,
  spoqaMedium,
} from "styles/common/common.styled";
import { string } from "prop-types";
import { motion } from "framer-motion";
import Button from "components/Button/Button";

/* ---------------------------- styled components ---------------------------- */

const AlertContainer = styled(motion.div).attrs({ role: "alert" })`
  text-align: center;
  display: flex;
  position: fixed;
  z-index: 30;
  top: 0;
  justify-content: center;
  align-items: center;
  color: var(--color-gray3);
  ${spoqaSmall}
  color: ${({ status }) =>
    (status === "error" && "#d28c92") ||
    (status === "success" && "#0d2e14") ||
    (status === "info" && "black")};
  background-color: ${({ status }) =>
    (status === "error" && "#f5d0d3") ||
    (status === "success" && "#c4e6cc") ||
    (status === "info" && "var(--color-body)")};
  border-radius: 3px;
  border: ${({ status }) =>
    status === "info" ? "none" : "1px solid currentColor"};
  padding: 5px;
  width: 100%;
  svg {
    path {
      fill: ${({ status }) =>
        (status === "error" && "#7f3c42") ||
        (status === "success" && "#0d2e14")};
    }
  }

  p {
    margin: 0;
    padding: 1em;
    margin-left: 5px;
    ${spoqaMedium};
    color: #923a3a;
  }

  svg {
    path {
      color: red;
    }
  }

  button {
    position: absolute;
    top: 0.5em;
    right: 1em;
  }
`;

/* -------------------------------------------------------------------------- */

export default function Alert({ status, fixed, message, onClick }) {
  return (
    <AlertContainer
      status={status}
      initial={{
        y: -15,
      }}
      animate={{
        y: 46, // navigation + border
      }}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.5,
      }}
    >
      <p>{message}</p>
      <Button onClick={onClick} icon="error" />
    </AlertContainer>
  );
}

/* -------------------------------- proptypes ------------------------------- */

Alert.propTypes = {
  status: string,
  message: string,
};
