import React from "react";
import styled from "styled-components";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  quotes: none;
`;
const QuoteBy = styled.footer`
  margin-top: 1em;
  text-align: right;
`;

export default function QuotesContent({ children, cite, author }) {
  return (
    <article>
      <p>
        <Quote cite={cite} lang="en">
          {children}
        </Quote>
        <QuoteBy>{author}</QuoteBy>
      </p>
    </article>
  );
}
