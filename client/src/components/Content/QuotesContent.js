import React from "react";
import styled from "styled-components";
import {
  museoMedium,
  museoSmall,
  spoqaMedium,
} from "styles/common/common.styled";
import { string, node, bool } from "prop-types";

/* ---------------------------- styled component ---------------------------- */

const Quote = styled.q`
  ${({ lang }) => (lang === "en" ? museoMedium : spoqaMedium)}
  display: block;
  max-width: 20em;
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
