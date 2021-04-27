import React from "react";
import styled from "styled-components";
import { museoSmall, spoqaSmall } from "styles/common/common.styled";
import { string, bool, object } from "prop-types";
import { Skeleton } from "@material-ui/lab";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  ${({ lang }) => (lang === "en" ? museoSmall : spoqaSmall)}
  display: block;
  max-width: 20em;
  padding: 0 0.5em;
  color: var(--color-text);
  quotes: none;
  text-align: ${({ textCenter }) => (textCenter ? "center" : "left")};
  margin: 0 auto;
  margin-top: 2em;
`;

const QuoteBy = styled.footer`
  ${museoSmall}
  color: var(--color-gray3);
  position: absolute;
  right: 1em;
  bottom: 1em;
`;

const QuoteSkeleton = styled(Skeleton)`
  display: block;
  max-width: 20em;
  margin: 0 auto;
`;

const QuoteBySkeleton = styled(Skeleton)`
  position: absolute !important; // Material UI 기본 스타일 오버라이딩 때문에 사용
  right: 1em;
  bottom: 1em;
  width: 10em;
`;

/* -------------------------------------------------------------------------- */

export default function QuotesContent({
  quote,
  textCenter = false,
  lang,
  $isLoading,
  ...restProps
}) {
  return (
    <article {...restProps}>
      {quote && !$isLoading ? (
        <>
          <Quote cite={quote.author} textCenter lang={lang}>
            {lang === "ko" ? quote.content.translated : quote.content.original}
          </Quote>
          <QuoteBy>{quote.author}</QuoteBy>
        </>
      ) : (
        <Quote>
          <QuoteSkeleton animation="wave" />
          <QuoteSkeleton animation="wave" />
          <QuoteBySkeleton animation="wave" />
        </Quote>
      )}
    </article>
  );
}

/* -------------------------------- proptypes ------------------------------- */

QuotesContent.propTypes = {
  quote: object,
  textCenter: bool,
  author: string,
  lang: string,
  $isLoading: bool,
};
