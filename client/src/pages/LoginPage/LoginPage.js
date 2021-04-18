import React, { useEffect } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { pageEffect } from "styles/motions/variants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LinkA from "components/LinkA/LinkA";

export default function LoginPage() {
  const { isAuthed } = useSelector((state) => state.auth);
  let history = useHistory();

  useEffect(() => {
    if (isAuthed) history.push("/");
  }, [history, isAuthed]);

  return (
    <PageContainer
      page="login"
      variants={pageEffect}
      initial="hidden"
      animate="visible"
    >
      <LinkA
        icon="github"
        outline
        width="14em"
        height="2.5em"
        href="/auth/github"
      >
        Sign In With Github
      </LinkA>
    </PageContainer>
  );
}
