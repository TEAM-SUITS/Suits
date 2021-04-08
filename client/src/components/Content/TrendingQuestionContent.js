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
`;

/* -------------------------------------------------------------------------- */

export default function TrendingQuestionContent({ ...restProps }) {
  return (
    <article {...restProps}>
      <QuestionList>
        {/* 예시 */}
        <li>
          <QuestionCard>
            <p>자바스크립트에서 private한 속성을 만드는 방법을 설명하세요.</p>
          </QuestionCard>
        </li>
        <li>
          <QuestionCard>
            자바스크립트에서 재귀 호출로 인한 stack overflow를 방지하는 방법을
            설명하세요.
          </QuestionCard>
        </li>
        <li>
          <QuestionCard>
            자바스크립트 프로토타입이 무엇인지와, 그 동작방식에 대해서
            설명해보세요.
          </QuestionCard>
        </li>
      </QuestionList>
    </article>
  );
}
