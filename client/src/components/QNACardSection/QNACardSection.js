import API from "api/api";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import QnAContent from "components/Content/QnAContent";
import TrendingQuestionContent from "components/Content/TrendingQuestionContent";
import QnADialog from "containers/QnADialog/QnADialog";
import { useState } from "react";
import styled, { css } from "styled-components";
import { boxShadow, resetList } from "styles/common/common.styled";

const CardList = styled.ul`
  ${resetList}
`;

const RefreshButton = styled(Button)`
  position: absolute;
  bottom: 1em;
  background-color: var(--color-gray1);
  border: 2px solid var(--color-gray2);
  ${boxShadow};
  svg path {
    fill: var(--color-orange);
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

export default function QNACardSection({
  content,
  isLoading,
  cardData = {},
  onClick,
  refreshData,
  isMobile,
}) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [question, setQuestion] = useState({});

  const handleDialog = async (id) => {
    const res = await API(`/api/questions/${id}`, "get");
    setQuestion(res);
  };

  const refreshQuestion = async () => {
    const res = await API(`/api/questions/${question._id}`, "get");
    setQuestion(res);
    refreshData();
  };

  const previewAnswer = (answers) => {
    return answers.reduce(
      (prev, curr) => {
        if (curr.likes.length >= prev.likes.length) {
          return curr;
        }
        return prev;
      },
      { likes: [] }
    );
  };

  const renderCard = () => {
    switch (content) {
      case "randomQ":
        return cardData.map((data) => (
          <li key={data._id}>
            <Card
              isQuestion={true}
              title={data.content}
              tags={data.hashTag}
              hasButton
              onClick={() => {
                setIsDialogVisible(true);
                handleDialog(data._id);
              }}
            >
              <QnAContent
                answer={!!data.answers.length && previewAnswer(data.answers)}
              />
              <RefreshButton
                outline
                icon="refresh"
                onClick={() => refreshData()}
                aria-label="새로고침"
                isMobile={isMobile}
              />
            </Card>
          </li>
        ));
      case "trendingQ":
        return (
          <Card title="Trending QnA">
            <TrendingQuestionContent
              questions={cardData}
              $isLoading={isLoading}
            />
          </Card>
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

      <CardList>
        {cardData ? (
          isLoading ? (
            <>Loading...</>
          ) : (
            renderCard()
          )
        ) : (
          <>Loading...</>
        )}
      </CardList>
    </>
  );
}
