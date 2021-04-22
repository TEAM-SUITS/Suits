import Card from "components/Card/Card";
import React from "react";
import styled from "styled-components";
import { resetList } from "styles/common/common.styled";
import { Skeleton } from "@material-ui/lab";

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
  return (
    <article {...restProps}>
      <QuestionList>
        {questions && !$isLoading ? (
          questions.map(({ _id, content }) => {
            return (
              <li key={_id}>
                <QuestionCard
                  isQuestion={true}
                  isDialog={false}
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
    </article>
  );
}
