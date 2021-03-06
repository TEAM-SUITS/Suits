import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import QnAContent from 'components/Content/QnAContent';
import TrendingQuestionContent from 'components/Content/TrendingQuestionContent';
import QnADialog from 'containers/QnADialog/QnADialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from 'redux/storage/error/error';
import styled from 'styled-components';
import { boxShadow, resetList } from 'styles/common/common.styled';

const CardList = styled.ul`
  ${resetList}
  width:100%;
  @media screen and (max-width: 480px) {
    width: 350px;
    margin: 3em auto;
  }
`;

const StyledCard = styled(Card)`
  > div {
    &:last-child {
      margin-top: 3rem;
    }
  }
`;

const RefreshButton = styled(Button)`
  position: absolute;
  bottom: 1em;
  background-color: var(--color-gray1);
  border: 2px solid var(--color-gray2);
  ${boxShadow};
  svg path {
    fill: var(--color-text);
  }
  @media screen and (max-width: 480px) {
    top: 0;
    left: 0;
    height: 2em;
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #0000001f;
    box-shadow: none;
  }
`;

/* --------------------------- Skeleton Component --------------------------- */

// 기본 카드 스켈레톤
const SkeletonCard = styled(Skeleton)`
  max-width: 688px;
  background-color: #e6e6e6;
  width: 100%;
  border-radius: 10px;
  margin: 0 auto;
`;

// Trending QA 스켈레톤
const QuestionCardSkeleton = styled(Skeleton)`
  margin-top: 1em;
  min-height: 4em;
`;

export default function QNACardSection({ content, isLoading, cardData = {}, refreshData, previewAnswer, isMobile }) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [question, setQuestion] = useState({});

  const dispatch = useDispatch();

  const refreshQuestion = async () => {
    try {
      const res = await axios(`/api/questions/${question._id}`);
      setQuestion(res.data);
      refreshData();
    } catch (err) {
      dispatch(setError('질문을 새고고침하는 중 문제가 발생했습니다.'));
    }
  };

  const renderCard = () => {
    switch (content) {
      case 'randomQ':
        return cardData.map((question) => (
          <li key={question._id}>
            <StyledCard
              qId={question._id}
              isQuestion={true}
              isPreview={true}
              title={question.content}
              tags={question.hashTag}
              hasButton
              centerAlign
            >
              <QnAContent answer={!!question.answers.length && previewAnswer(question.answers)} />
              <RefreshButton
                outline
                icon="refresh"
                onClick={(e) => {
                  e.stopPropagation();
                  refreshData();
                }}
                aria-label="새로고침"
                isMobile={isMobile}
              />
            </StyledCard>
          </li>
        ));
      case 'trendingQ':
        return (
          <Card title="Trending QnA" centerAlign>
            <TrendingQuestionContent questions={cardData} $isLoading={isLoading} />
          </Card>
        );
      case 'answeredQ':
        return cardData.answeredQuestions.map((question) => (
          <li key={question._id}>
            <Card
              className="question"
              qId={question._id}
              isQuestion={true}
              isPreview={true}
              title={question.content}
              tags={question.hashTag}
            >
              <QnAContent answer={question.answers.find((answer) => answer.postedby?._id === cardData._id)} />
            </Card>
          </li>
        ));

      default:
        return;
    }
  };

  const renderSkeleton = () => {
    switch (content) {
      case 'randomQ':
        return <SkeletonCard variant="rect" animation="wave" height={200} />;
      case 'trendingQ':
        return (
          <CardList>
            <li>
              <QuestionCardSkeleton variant="rect" animation="wave" />
            </li>
            <li>
              <QuestionCardSkeleton variant="rect" animation="wave" />
            </li>
            <li>
              <QuestionCardSkeleton variant="rect" animation="wave" />
            </li>
          </CardList>
        );
      default:
        return;
    }
  };
  return (
    <>
      <QnADialog
        isVisible={isDialogVisible}
        onClick={() => {
          setIsDialogVisible(false);
          setQuestion({});
        }}
        question={question}
        refreshQuestion={refreshQuestion}
      />

      {!cardData || isLoading ? <Card>{renderSkeleton()}</Card> : <CardList>{renderCard()}</CardList>}
    </>
  );
}
