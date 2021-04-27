import React, { useEffect, useState } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { pageEffect } from "styles/motions/variants";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import { museoLarge } from "styles/common/common.styled";

const LoginContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 10em;
  svg {
    path {
      fill: var(--color-white);
    }
  }
  h1 {
    text-transform: uppercase;
    ${museoLarge}
    font-weight: 700;
    color: var(--color-white);
    user-select: none;
  }
  button {
    svg {
      path {
        fill: var(--color-black);
      }
    }
    margin-top: 5em;
    background-color: var(--color-gray2);
  }
`;

export default function LoginPage() {
  const { isAuthed, isLoading, error } = useSelector((state) => state.auth);
  // 여러번 auth를 통한 인증 요청을 보내지 않도록 로그인 버튼 클릭시 disabled 설정을 해줄 상태 설정
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const state = useLocation().state;

  // 사용자가 이미 로그인 상태일때 url을 이용해 /login에 직정접으로 접근하려고 할시 홈 라우트로 이동하도록 설정
  // 인증 요청을 하고 정상적으로 인증이 됐을 경우 홈으로 이동,
  // 오류가 발생했을시는 버튼을 다시 활성화 시켜서 다시 시도할수 있도록 설정

  useEffect(() => {
    if (isAuthed) {
      !state?.referrer ? history.push("/") : history.push(state?.referrer);
    } else if (error) {
      setDisabled(false);
    }
  }, [history, isAuthed, error]);

  const handleGithubLogin = () => {
    setDisabled(true);
    window.open("/auth/github", "_self");
  };

  return (
    <PageContainer
      page="login"
      variants={pageEffect}
      initial="hidden"
      animate="visible"
    >
      <LoginContent>
        <Icon type="logo" title="Suits" height="10em" />
        <h1>Suits</h1>
        <Button
          icon="github"
          outline
          width="14em"
          height="2.5em"
          isLoading={isLoading}
          disabled={disabled}
          onClick={handleGithubLogin}
        >
          Sign In With Github
        </Button>
      </LoginContent>
    </PageContainer>
  );
}
