import React from "react";
import styled from "styled-components";
import { museoSmall, spoqaSmall } from "styles/common/common.styled";
import { string, node, bool } from "prop-types";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  ${({ lang }) => (lang === "en" ? museoSmall : spoqaSmall)}
  display: block;
  max-width: 20em;
  padding: 0 0.5em;
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
  author,
  cite = author,
  textCenter = false,
  lang,
  ...restProps
}) {
  return (
    <article {...restProps}>
      <Quote cite={cite} textCenter lang={lang}>
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
  lang: string,
};
