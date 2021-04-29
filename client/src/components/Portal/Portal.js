import React from 'react';
import ReactDOM from 'react-dom';
import { node, string } from 'prop-types';

/* 🎇차원문------------------------------------------------------------------- */
export default function Portal({ children, id }) {
  const mountDomNode = React.useMemo(() => document.getElementById(id), [id]);

  return ReactDOM.createPortal(children, mountDomNode);
  // https://ko.reactjs.org/docs/portals.html
  // 첫 번째 인자로는 렌더링할 React child를 받고,
  // 두 번째 인자로는 렌더링될 위치, 즉 DOM 엘리먼트를 받는다.
}

/* ------------------------------- prop-types ------------------------------- */
Portal.propTypes = {
  children: node,
  id: string.isRequired,
};
