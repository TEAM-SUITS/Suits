import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageContainer from "containers/PageContainer/PageContainer.styled";
import { pageEffect } from "styles/motions/variants";
import TextHeaderBar from "containers/TextHeaderBar/TextHeaderBar";
import Card from "components/Card/Card";
import QuotesContent from "components/Content/QuotesContent";
import axios from "axios";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import HardWorkersContent from "components/Content/HardWorkersContent";
import { TrendingQnAContent } from "components/Content/TrendingQuestionContent.stories";

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
    color: #eb5022;
  }
`;

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  // 홈페이지에서 관리될 임시 상태들 (일부 상태 제외하곤 리덕스로 처리 예정)
  const [quote, setQuote] = useState(null);
  const [quoteLanguage, setQuoteLanguage] = useState("ko");
  const [hardWorkers, setHardWorkers] = useState(null);
  const [trendingQ, setTrendingQ] = useState(null);

  const [quoteLoading, setQuoteLoading] = useState(false);
  const [workersLoading, setWorkersLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setQuoteLoading(true);
      const { data } = await axios("/api/quote");
      setQuote(data);
    } catch (err) {
      console.error(err);
    } finally {
      setQuoteLoading(false);
    }
  };

  const fetchHardWorkers = async () => {
    try {
      setWorkersLoading(true);
      const { data } = await axios("/api/hard-workers");
      setHardWorkers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setWorkersLoading(false);
    }
  };

  const fetchTrendingQ = async () => {
    try {
      const { data } = await axios("/api/questions/trend");
      setTrendingQ(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchHardWorkers();
    fetchTrendingQ();
  }, []);

  return (
    <>
      <TextHeaderBar page="home" />
      <PageContainer
        page="home"
        variants={pageEffect}
        initial="hidden"
        animate="visible"
      >
        {/* 명언 카드 섹션 */}
        <Card title="Wisdom Of The Day">
          {
            <QuotesContent
              textCenter
              quote={quote}
              lang={quoteLanguage}
              $isLoading={quoteLoading}
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
          <HardWorkersContent users={hardWorkers} $isLoading={workersLoading} />
        </Card>
        {/* 급상승 질문 탑3 */}
        <Card title="Trending QnA">
          {trendingQ && (
            <TrendingQnAContent
              questions={trendingQ}
              $isLoading={trendingLoading}
            />
          )}
        </Card>
      </PageContainer>
    </>
  );
}
