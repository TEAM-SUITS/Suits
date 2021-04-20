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
  justify-content: center;
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
  const [quote, setQuote] = useState(null);
  const [quoteLanguage, setQuoteLanguage] = useState("ko");

  const fetchQuote = async () => {
    try {
      const { data } = await axios("/api/quote");
      setQuote(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuote();
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
          {quote && (
            <QuotesContent
              textCenter
              author={quote.author}
              lang={quoteLanguage}
            >
              {quoteLanguage === "ko"
                ? quote.content.translated
                : quote.content.original}
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
            </QuotesContent>
          )}
        </Card>
        {/* 누적 좋아요 순위 섹션 */}
        <Card title="Hard Workers">
          <HardWorkersContent></HardWorkersContent>
        </Card>
        {/* 급상승 질문 탑3 */}
        <Card title="Trending QnA">
          <TrendingQnAContent></TrendingQnAContent>
        </Card>
      </PageContainer>
    </>
  );
}
