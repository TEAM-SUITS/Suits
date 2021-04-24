import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Container = forwardRef((props, ref) => {
  return <div ref={ref} {...props}></div>;
});

const PageContainer = styled(motion(Container))`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) =>
    margin ? margin : '7.5em 0'}; //4.5em(네비게이션) + 3em 마진(기본)

  ${({ page }) =>
    page === 'login' &&
    css`
      margin: 0;
      background-color: var(--color-black);
      min-height: 100vh;
    `}

  ${({ page }) =>
    page === 'home' &&
    css`
      > div {
        margin-bottom: 3em;
      }
    `}

  ${({ page }) =>
    page === 'search' &&
    css`
      margin: ${({ margin }) => (margin ? margin : '120px 0')};
      justify-content: flex-start;

      > div {
        margin-top: 3em;
      }

      // mobile
      @media screen and (max-width: 480px) {
        > div {
          max-width: 350px;
        }
      }
    `}

    ${({ page }) =>
    page === 'profile' &&
    css`
      margin: 4.5em 0;

      .question {
        margin-bottom: 3em;
      }
      @media screen and (min-width: 640px) {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;

        .profile {
          max-width: 30em;
          margin-right: 3em;
        }
        .question {
          h2 {
            max-height: 3em;
            overflow-y: scroll;
          }
          p {
            min-height: 60px;
          }
        }
      }

      li {
        max-width: 350px;
      }

      > div {
        margin-bottom: 3em;
      }
    `}

    ${({ page }) =>
    page === 'follow' &&
    css`
      justify-content: flex-start;

      li {
        margin-top: 3em;
      }

      // mobile
      @media screen and (max-width: 480px) {
        li {
          max-width: 350px;
        }
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
