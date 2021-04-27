import { useEffect, useState } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import API from "api/api";

/* ---------------------------- styled components --------------------------- */

/* -------------------------------- post page ------------------------------- */
export default function PostPage({ history, location, match }) {
  const { qid } = match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async (id) => {
      const res = await API(`/api/questions/${id}`, 'get');
      console.log(res);
    };

    getData(qid);
  })

  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer>
        <p>test</p>
      </PageContainer>
    </>
  );
};
