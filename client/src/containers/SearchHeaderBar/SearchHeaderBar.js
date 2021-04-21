import { useState, useRef, useEffect, useSelector } from 'react';
import styled from 'styled-components';
import HeaderBar from '../HeaderBar/HeaderBar';
import Icon from 'components/Icon/Icon';
import { museoSmall, spoqaSmallBold, spoqaSmall } from 'styles/common/common.styled';
import { func, string } from 'prop-types';

/* ------------------------------- 검색 중이 아닐 떄 ------------------------------- */
const SearchButton = styled.button.attrs(() => ({
  type: "button",
}))`
  transform: translate(0, 45px);
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  text-align: initial;
  border: 1px solid var(--color-gray1);
  
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
  transform: translate(0, 45px);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray1);

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
export default function SearchHeaderBar({ onKeyUp, initialWord }) {
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState(initialWord);
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

    const inputNode = ref.current;

    return () => {
      if (inputNode) inputNode.blur();
      // focus() 한 것은 blur()로 clean up 해줘야 함. (성능 이슈)
    };
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
          onKeyUp={onKeyUp}
          />
        <CancelButton onClick={resetInput}>CANCEL</CancelButton>
      </FlexBox>
    </HeaderBar>
  );
}

/* -------------------------------- proptypes ------------------------------- */
SearchHeaderBar.propTypes = {
  onKeyUp: func.isRequired,
  initialWord: string.isRequired,
};
