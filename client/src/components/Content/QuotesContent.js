import React from "react";
import styled from "styled-components";
import { museoSmall } from "styles/common/common.styled";
import { string, node } from "prop-types";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  ${museoSmall}
  color: var(--color-black);
  quotes: none;
`;
const QuoteBy = styled.footer`
  ${museoSmall}
  margin-top: 1em;
  text-align: right;
  color: var(--color-gray3);
`;

/* -------------------------------------------------------------------------- */

export default function QuotesContent({
  children,
  cite,
  author,
  ...restProps
}) {
  return (
    <article {...restProps}>
      <Quote cite={cite} lang="en">
        {children}
      </Quote>
      <QuoteBy>{author}</QuoteBy>
    </article>
  );
}

/* -------------------------------- proptypes ------------------------------- */

QuotesContent.propTypes = {
  children: node,
  cite: string,
  author: string,
};
