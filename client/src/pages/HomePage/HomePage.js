import React, { useEffect, useState } from "react";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchHardWorkersData } from "redux/storage/hardWorkers/hardWorkers";
import { fetchTrendingData } from "redux/storage/trendingQ/trendingQ";
import { fetchRandomQuoteData } from "redux/storage/quote/quote";
import { fetchRandomQData } from "redux/storage/randomQ/randomQ";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Card from "components/Card/Card";
import QuotesContent from "components/Content/QuotesContent";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import HardWorkersContent from "components/Content/HardWorkersContent";
import TrendingQuestionContent from "components/Content/TrendingQuestionContent";
import QnAContent from "components/Content/QnAContent";
import Button from "components/Button/Button";
import { Skeleton } from "@material-ui/lab";
import KeywordSelect from "components/KeywordSelect/KeywordSelect";
import { boxShadow } from "styles/common/common.styled";
import useDetectViewport from "hooks/useDetectViewport";

/* ---------------------------- styled components --------------------------- */

const StyledButtonGroup = styled(ToggleButtonGroup)`
  justify-content: start;
  width: 100%;
  margin-top: 1.2em;

  button {
    color: var(--color-text);
  }
  button:disabled {
    font-weight: 700;
    color: var(--color-orange);
  }
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

const SkeletonCard = styled(Skeleton)`
  max-width: 688px;
  background-color: #e6e6e6;
  width: 100%;
  margin-bottom: 3em;
  border-radius: 10px;
`;

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const [quoteLanguage, setQuoteLanguage] = useState("ko");
  const [isSelectingKeywords, setIsSelectingKeywords] = useState(false);
  const { isMobile } = useDetectViewport();

  const dispatch = useDispatch();

  const { currentUserData } = useSelector((state) => state.currentUser);

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
    dispatch(fetchRandomQData("init"));
    dispatch(fetchRandomQuoteData("init"));
    dispatch(fetchTrendingData("init"));
    dispatch(fetchHardWorkersData("init"));
  }, [dispatch]);

  // 처음 앱에 가입한 유저인 경우 키워드 설정하는 모달이 나오도록 설정
  useEffect(() => {
    if (currentUserData && currentUserData[0].firstLogin)
      setIsSelectingKeywords(true);
  }, [currentUserData]);

  return (
    <>
      {isSelectingKeywords && (
        <KeywordSelect
          userKeywords={currentUserData[0].hashTag}
          onClose={() => setIsSelectingKeywords(false)}
        />
      )}

      <TextHeaderBar page="home" />
      <PageContainer
        page="home"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        {/* 랜덤 QnA 카드 섹션 */}
        {randomQData && !isRandomQLoading ? (
          <Card
            isQuestion
            title={randomQData.content}
            tags={randomQData.hashTag}
            hasButton
          >
            <QnAContent
              answer={
                randomQData.answers &&
                randomQData.answers.reduce(
                  (prev, curr) => {
                    if (curr.likes.length >= prev.likes.length) {
                      return curr;
                    }
                    return prev;
                  },
                  { likes: [] }
                )
              }
            />
            <RefreshButton
              outline
              icon="refresh"
              onClick={() => dispatch(fetchRandomQData())}
              aria-label="새로고침"
              isMobile={isMobile}
            />
          </Card>
        ) : (
          <SkeletonCard variant="rect" animation="wave" height="16em" />
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
