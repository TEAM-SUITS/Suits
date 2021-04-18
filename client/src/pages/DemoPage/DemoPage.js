import React from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import { useDispatch } from "react-redux";
import { fetchUserAction, signOutAction } from "redux/storage/auth/auth";
import axios from "axios";
import { useState } from "react";
import LikeButton from "components/LikeButton/LikeButton";

/* ----------------------- 테스트용 페이지 ------------------------------------- */
export default function DemoPage() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  // const handleDeleteUser = async () => {
  //   const res = await axios.delete("/api/user");
  //   console.log(res);
  //   dispatch(fetchUserAction());
  // };

  // const submitHashtag = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.patch("/api/user-profile/hashtag", {
  //     hashTag: ["Javascript"],
  //   });
  //   console.log(res);
  //   dispatch(fetchUserAction());
  // };

  const postAnswer = async () => {
    const res = await axios.post("/api/answers", {
      content,
      questionId: "607a3bf49187675cc6d6d92d",
    });

    await axios.patch("/api/questions/607a3bf49187675cc6d6d92d", {
      answerId: res.data._id,
    });

    dispatch(fetchUserAction());
  };

  const patchAnswer = async () => {
    const res = await axios.patch("/api/answers/60783162fc60153f9c61c958", {
      content,
    });

    console.log(res);

    dispatch(fetchUserAction());
  };

  const deleteAnswer = async () => {
    const res = await axios.delete("/api/answers/6078303db455a302743baec0");
    dispatch(fetchUserAction());

    console.log(res);
  };

  const handleLike = async () => {
    const res = await axios.put("/api/like/6078d9a9692dfa08e1606423");
    alert("좋아요!");
    console.log(res);
  };

  const handleUnLike = async () => {
    const res = await axios.put("/api/unlike/6078d9a9692dfa08e1606423");
    alert("싫어요!");
    console.log(res);
  };

  return (
    <>
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <>
          <LikeButton onClick={handleLike} /> 좋아요
          <LikeButton isLiked onClick={handleUnLike} /> 좋아요 해제
          <form>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="button" onClick={postAnswer}>
              답변 등록
            </button>
            <button type="button" onClick={patchAnswer}>
              답변 수정
            </button>
            <button type="button" onClick={deleteAnswer}>
              답변 삭제ㅋ
            </button>
          </form>
        </>
        )
      </PageContainer>
    </>
  );
}
