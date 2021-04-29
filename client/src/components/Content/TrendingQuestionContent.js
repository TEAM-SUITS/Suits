import Card from 'components/Card/Card';
import React from 'react';
import styled from 'styled-components';
import { resetList } from 'styles/common/common.styled';

import QnADialog from 'containers/QnADialog/QnADialog';
import { useState } from 'react';

/* ---------------------------- styled component ---------------------------- */

const QuestionList = styled.ul`
  ${resetList}
  margin-top: 2em;

  li {
    margin-bottom: 1em;
  }
`;
const QuestionCard = styled(Card)`
  margin-bottom: 1em;
  text-align: center;

  h2 {
    margin: 0;
    padding: 0;
  }

  a {
    font-weight: 400;
    margin: 0;
    font-size: 1.4rem;
  }
`;

/* -------------------------------------------------------------------------- */

export default function TrendingQuestionContent({ questions, $isLoading, ...restProps }) {
  const [isDialogVisible, setDialogVisiblity] = useState(false);
  const [question, setQuestion] = useState({});

  return (
    <article {...restProps}>
      <QuestionList>
        {questions.map(({ _id, content }) => {
          return (
            <li key={_id}>
              <QuestionCard qId={_id} isQuestion={false} isPreview={true} title={content} noDivider={true} />
            </li>
          );
        })}
      </QuestionList>
      <QnADialog
        isVisible={isDialogVisible}
        onClick={() => {
          setDialogVisiblity(false);
          setQuestion({});
        }}
        question={question}
      />
    </article>
  );
}
