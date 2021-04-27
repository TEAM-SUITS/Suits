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

  // HeaderBar와 AdBanner를 딱 붙도록 수정
  margin-top: 45px;

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
      // Non Clickable Card
      > div {
        margin-bottom: 3em;
        &:first-of-type {
          @media screen and (max-width: 375px) {
            margin-bottom: 1em;
          }
        }
      }

      // Question List
      > ul {
        width: 100%;
        margin-bottom: 3em;

        // 홈페이지 광고 배너와 랜덤 질문 사이 이격
        &:first-of-type {
          margin-top: 2em;
        }
        div {
          margin: 0 auto;
        }
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
        margin-top: 3em;
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

  ${({ page }) =>
    page === "post" &&
    css`
      margin: 50px 0;
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
`;
export default PageContainer;
