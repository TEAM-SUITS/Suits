import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import HeaderBar from '../HeaderBar/HeaderBar';
import Icon from 'components/Icon/Icon';
import { museoSmall, spoqaSmallBold, spoqaSmall } from 'styles/common/common.styled';

/* ------------------------------- 검색 중이 아닐 떄 ------------------------------- */
const SearchButton = styled.button.attrs(() => ({
  type: "button",
}))`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  text-align: initial;
  border: none;
  
  div {
    position: relative;
    width: 8em;
    height: 2em;
    margin: 0 auto;

    svg {
      position: absolute;
      vertical-align: initial;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    em {
      position: absolute;
      right: 0;
      display: inline-block;
      ${museoSmall}
      font-style: normal;
      color: var(--color-gray3);
      line-height: 1.5;
    }
  }
`;

/* --------------------------------- 검색 중일 때 -------------------------------- */
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;

  svg {
    margin: 10px;
    align-self: center;
  }

  input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    ${spoqaSmall}
    color: var(--color-gray3);
  }
`;

const CancelButton = styled.button.attrs(() => ({
  type: "button",
}))`
  background-color: var(--color-white);
  ${spoqaSmallBold}
  color: var(--color-red);
  border: none;
  padding: 0 1em;
`;

/* -------------------------------------------------------------------------- */
function SearchHeaderBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');
  const ref = useRef(null);

  const handleInput = e => {
    setKeyword(e.target.value);
  };

  const handleSearching = () => {
    setIsSearching(true);
  };

  const resetInput = () => {
    setKeyword('');
  };

  // Search Header Bar 클릭 후 input 포커스
  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [isSearching]);

  if (!isSearching) {
    return (
      <HeaderBar>
        <SearchButton onClick={handleSearching}>
          <div>
            <Icon type="search" title="검색 버튼" height="18px" />
            <em>Search</em>
          </div>
        </SearchButton>
      </HeaderBar>
    );
  }

  return (
    <HeaderBar>
      <FlexBox>
        <Icon type="search" title="검색 버튼" height="18px" />
        <input
          type="text"
          onChange={handleInput}
          ref={ref}
          value={keyword}
          />
        <CancelButton onClick={resetInput}>CANCEL</CancelButton>
      </FlexBox>
    </HeaderBar>
  );
}

export default React.memo(SearchHeaderBar);
