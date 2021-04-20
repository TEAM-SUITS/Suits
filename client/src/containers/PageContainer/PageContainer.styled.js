import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const Container = forwardRef((props, ref) => {
  return <div ref={ref} {...props}></div>;
});

const PageContainer = styled(motion(Container))`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  margin: ${({ margin }) => (margin ? margin : "7.5em 0")};
  background-color: var(--var-lightgray2);
  min-height: 100vh;

  ${({ page }) =>
    page === "login" &&
    css`
      background-color: var(--color-black);
    `}

  ${({ page }) =>
    page === "home" &&
    css`
      > div {
        margin-bottom: 3em;
      }
    `}  

  ${({ ismobile }) =>
    ismobile &&
    css`
      margin: 0 auto;
      width: 100%;
    `}
`;
export default PageContainer;
