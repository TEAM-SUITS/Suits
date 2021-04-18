import React, { useEffect } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { pageEffect } from "styles/motions/variants";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import IconLinkA from "components/IconLinkA/IconLinkA";

export default function LoginPage() {
  const { isAuthed } = useSelector((state) => state.auth);
  let history = useHistory();

  useEffect(() => {
    if (isAuthed) history.push("/");
  }, [history, isAuthed]);

  return (
    <PageContainer variants={pageEffect} initial="hidden" animate="visible">
      <IconLinkA icon="search" outline href="/auth/github">
        Sign In With Github
      </IconLinkA>
    </PageContainer>
  );
}
