import React from "react";
import styled from "styled-components";
import { museoSmall } from "styles/common/common.styled";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  quotes: none;
`;
const QuoteBy = styled.footer`
  ${museoSmall}
  margin-top: 1em;
  text-align: right;
  color: var(--color-gray3);
`;

export default function QuotesContent({ children, cite, author }) {
  return (
    <article>
      <Quote cite={cite} lang="en">
        {children}
      </Quote>
      <QuoteBy>{author}</QuoteBy>
    </article>
  );
}
