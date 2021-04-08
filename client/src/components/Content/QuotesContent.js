import React from "react";
import styled from "styled-components";
import { museoSmall } from "styles/common/common.styled";
import { string, node, bool } from "prop-types";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  ${museoSmall}
  color: var(--color-black);
  quotes: none;
  text-align: ${({ textCenter }) => (textCenter ? "center" : "left")};
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
  textCenter = false,
  ...restProps
}) {
  return (
    <article {...restProps}>
      <Quote cite={cite} lang="en" textCenter>
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
  textCenter: bool,
  author: string,
};
