import Card from 'components/Card/Card';
import React from 'react';
import styled from 'styled-components';
import { resetList } from 'styles/common/common.styled';

import QnADialog from 'containers/QnADialog/QnADialog';
import { useState } from 'react';
import { fetchTrendingData } from 'redux/storage/trendingQ/trendingQ';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setError } from 'redux/storage/error/error';

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
  const [isDialogVisible, setDialogVisiblity] = useState(false);
  const [question, setQuestion] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(); //TODO: 로딩처리

  const handleDialog = async (id) => {
    setDialogVisiblity(true);
    try {
      setLoading(true);
      const res = await axios(`/api/questions/${id}`);
      setQuestion(res.data);
    } catch (err) {
      dispatch(setError('질문을 불러들이는 중 문제가 발생했습니다.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <article {...restProps}>
      <QuestionList>
        {questions.map(({ _id, content }) => {
          return (
            <li key={_id}>
              <QuestionCard isQuestion={true} onClick={() => handleDialog(_id)}>
                <p>{content}</p>
              </QuestionCard>
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
        // refreshQuestion={() => dispatch(fetchTrendingData())}
      />
    </article>
  );
}
