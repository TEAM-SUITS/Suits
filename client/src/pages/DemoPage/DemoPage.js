import React, { useEffect } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction, signOutAction } from "redux/storage/auth/auth";
import axios from "axios";
import { useState } from "react";

/* ----------------------- 테스트용 페이지 ------------------------------------- */
export default function DemoPage() {
  const { isAuthed } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const handleDeleteUser = async () => {
    const res = await axios.delete("/api/user");
    console.log(res);
    dispatch(fetchUserAction());
  };

  const submitHashtag = async (e) => {
    e.preventDefault();
    const res = await axios.patch("/api/user-profile/hashtag", {
      hashTag: ["Javascript"],
    });
    console.log(res);
    dispatch(fetchUserAction());
  };

  const postAnswer = async () => {
    const res = await axios.post("/api/answers", {
      content,
      questionId: '60751695af540a054f122915',
    });

    await axios.patch('/api/questions/60751695af540a054f122915', {
      answerId: res.data._id,
    });

    dispatch(fetchUserAction());
  };

  const patchAnswer = async () => {
    const res = await axios.patch('/api/answers/60783162fc60153f9c61c958', {
      content,
    });

    console.log(res);

    dispatch(fetchUserAction());
  };

  return (
    <>
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        {isAuthed ? (
          <>
            <button onClick={() => dispatch(signOutAction())}>LOGOUT</button>
            <button onClick={handleDeleteUser}>회원탈퇴</button>
            <form onSubmit={submitHashtag}>
              <button type="submit">자바스크립트 해시태그 추가</button>
            </form>
            <form>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="button" onClick={postAnswer}>답변 등록</button>
              <button type="button" onClick={patchAnswer}>답변 수정</button>
            </form>
          </>
        ) : (
          <a href="/auth/github">Sign In With Github</a>
        )}
      </PageContainer>
    </>
  );
}
