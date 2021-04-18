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
  margin: ${({ margin }) => (margin ? margin : "0px")};
  padding-top: 50px;
  background-color: black;
  height: 100vh;
  width: 100vw;
  ${({ ismobile }) =>
    ismobile &&
    css`
      margin: 0 auto;
      width: 100%;
    `}
`;
export default PageContainer;
