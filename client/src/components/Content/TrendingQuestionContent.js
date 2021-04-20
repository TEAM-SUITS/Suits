import Card from "components/Card/Card";
import React from "react";
import styled from "styled-components";
import { resetList } from "styles/common/common.styled";

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

/* -------------------------------------------------------------------------- */

export default function TrendingQuestionContent({
  questions,
  $isLoading,
  ...restProps
}) {
  return (
    <article {...restProps}>
      <QuestionList>
        {questions.map(({ _id, content }) => {
          return (
            <li key={_id}>
              <QuestionCard>
                <p>{content}</p>
              </QuestionCard>
            </li>
          );
        })}
      </QuestionList>
    </article>
  );
}
