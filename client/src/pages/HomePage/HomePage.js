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

/* ---------------------------- styled components --------------------------- */

const StyledButtonGroup = styled(ToggleButtonGroup)`
  justify-content: center;
  width: 100%;
  margin-top: 1.2em;
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
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
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
                <ToggleButton value="ko" aria-label="번역된 명언 보기">
                  ko
                </ToggleButton>
                <ToggleButton value="en" aria-label="원문 명언 보기">
                  en
                </ToggleButton>
              </StyledButtonGroup>
            </QuotesContent>
          )}
        </Card>
      </PageContainer>
    </>
  );
}
