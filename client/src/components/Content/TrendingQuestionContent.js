import Card from "components/Card/Card";
import React from "react";
import styled from "styled-components";
import { resetList } from "styles/common/common.styled";
import { Skeleton } from "@material-ui/lab";
import QnADialog from "containers/QnADialog/QnADialog";
import { useState } from "react";
import { fetchTrendingData } from "redux/storage/trendingQ/trendingQ";
import { useDispatch } from "react-redux";
import API from "api/api";

/* ---------------------------- styled component ---------------------------- */

const QuestionList = styled.ul`
  ${resetList}
`;
const QuestionCard = styled(Card)`
  margin-bottom: 1em;
  text-align: center;

  p {
    margin: 0;
    font-size: 1.4rem;
  }
`;

const QuestionCardSkeleton = styled(Skeleton)`
  min-width: 100%;
  min-height: 6em;
  width: 100%;
`;

/* -------------------------------------------------------------------------- */

export default function TrendingQuestionContent({
  questions,
  $isLoading,
  ...restProps
}) {
  const [isDialogVisible, setDialogVisiblity] = useState(false);
  const [question, setQuestion] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(); //TODO: 로딩처리

  const handleDialog = async (id) => {
    setDialogVisiblity(true);
    try {
      setLoading(true);
      const data = await API(`/api/questions/${id}`, "get");
      setQuestion(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article {...restProps}>
      <QuestionList>
        {questions && !$isLoading ? (
          questions.map(({ _id, content }) => {
            return (
              <li key={_id}>
                <QuestionCard
                  isQuestion={true}
                  onClick={() => handleDialog(_id)}
                >
                  <p>{content}</p>
                </QuestionCard>
              </li>
            );
          })
        ) : (
          <>
            <QuestionCardSkeleton animation="wave" />
            <QuestionCardSkeleton animation="wave" />
            <QuestionCardSkeleton animation="wave" />
          </>
        )}
      </QuestionList>
      <QnADialog
        isVisible={isDialogVisible}
        onClick={() => {
          setDialogVisiblity(false);
          setQuestion({});
        }}
        question={question}
        refreshQuestion={() => dispatch(fetchTrendingData())}
      />
    </article>
  );
}
