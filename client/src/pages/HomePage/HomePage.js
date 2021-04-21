import React, { useEffect, useState } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchHardWorkersData } from "redux/storage/hardWorkers/hardWorkers";
import { fetchTrendingData } from "redux/storage/trendingQ/trendingQ";
import { fetchRandomQuoteData } from "redux/storage/quote/quote";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Card from "components/Card/Card";
import QuotesContent from "components/Content/QuotesContent";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import HardWorkersContent from "components/Content/HardWorkersContent";
import TrendingQuestionContent from "components/Content/TrendingQuestionContent";
import { fetchRandomQData } from "redux/storage/randomQ/randomQ";
import QnAContent from "components/Content/QnAContent";
import Button from "components/Button/Button";

/* ---------------------------- styled components --------------------------- */

const StyledButtonGroup = styled(ToggleButtonGroup)`
  justify-content: start;
  width: 100%;
  margin-top: 1.2em;

  button {
    color: var(--color-black);
  }
  button:disabled {
    font-weight: 700;
    color: var(--color-orange);
  }
`;

const StyledRefreshButton = styled(Button)`
  position: absolute;
  bottom: 1em;
  background-color: transparent;
  border: 1px solid #0000001f;
  svg path {
    fill: var(--color-orange);
  }
`;

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const [quoteLanguage, setQuoteLanguage] = useState("ko");
  const dispatch = useDispatch();

  const {
    randomQData,
    isLoading: isRandomQLoading,
    error: randomQError,
  } = useSelector((state) => state.randomQ);

  const {
    quoteData,
    isLoading: isQuoteLoading,
    error: quoteError,
  } = useSelector((state) => state.quote);

  const {
    workersData,
    isLoading: isWorkerLoading,
    error: workerError,
  } = useSelector((state) => state.hardWorkers);

  const {
    trendingQData,
    isLoading: isTrendingLoading,
    error: trendingError,
  } = useSelector((state) => state.trendingQ);

  useEffect(() => {
    dispatch(fetchRandomQData());
    dispatch(fetchRandomQuoteData());
    dispatch(fetchTrendingData());
    dispatch(fetchHardWorkersData());
  }, [dispatch]);

  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer
        page="home"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        {/* 랜덤 QnA 카드 섹션 */}
        {randomQData && (
          <Card
            isQuestion={true}
            title={randomQData && randomQData.content}
            $isLoading={isRandomQLoading}
          >
            <QnAContent key={randomQData._id} answer={randomQData.answers[0]} />
            <StyledRefreshButton
              outline
              icon="refresh"
              onClick={() => dispatch(fetchRandomQData())}
              aria-label="새로고침"
            />
          </Card>
        )}
        {/* 명언 카드 섹션 */}
        <Card title="Wisdom Of The Day">
          {
            <QuotesContent
              textCenter
              quote={quoteData}
              lang={quoteLanguage}
              $isLoading={isQuoteLoading}
            />
          }
          <StyledButtonGroup
            exclusive
            value={quoteLanguage}
            onChange={(_, value) => setQuoteLanguage(value)}
          >
            <ToggleButton
              value="ko"
              aria-label="번역된 명언 보기"
              disabled={quoteLanguage === "ko"}
            >
              ko
            </ToggleButton>
            <ToggleButton
              value="en"
              aria-label="원문 명언 보기"
              disabled={quoteLanguage === "en"}
            >
              en
            </ToggleButton>
          </StyledButtonGroup>
        </Card>
        {/* 누적 좋아요 순위 섹션 */}
        <Card title="Hard Workers">
          <HardWorkersContent
            users={workersData}
            $isLoading={isWorkerLoading}
          />
        </Card>
        {/* 급상승 질문 탑3 */}
        <Card title="Trending QnA">
          <TrendingQuestionContent
            questions={trendingQData}
            $isLoading={isTrendingLoading}
          />
        </Card>
      </PageContainer>
    </>
  );
}
