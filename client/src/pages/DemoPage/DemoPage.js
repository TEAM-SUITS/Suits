import React, { useEffect } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction, signOutAction } from "redux/storage/auth/auth";

/* -------------------------------------------------------------------------- */
export default function DemoPage() {
  const { isAuthed } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  return (
    <>
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        {isAuthed ? (
          <button onClick={() => dispatch(signOutAction())}>LOGOUT</button>
        ) : (
          <a href="/auth/github">Sign In With Github</a>
        )}
      </PageContainer>
    </>
  );
}
