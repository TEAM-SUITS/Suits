import styled from 'styled-components';
import HeaderBar from './HeaderBar';
import Icon from 'components/Icon/Icon';
import { museoSmall } from 'styles/common/common.styled';

/* -------------------------------------------------------------------------- */
export function HomeHeaderBar() {
  return <HeaderBar>SUITS</HeaderBar>
}

/* -------------------------------------------------------------------------- */
const SearchButton = styled.button.attrs(() => ({
  type: "button",
}))`
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  text-align: initial;
  border: none;
  
  div {
    position: relative;
    width: 90px;
    height: 18px;
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
      line-height: 1;
    }
  }
`;

export function SearchHeaderBar({ isSearching }) {
  if (!isSearching) {
    return (
      <HeaderBar>
        <SearchButton>
          <div>
            <Icon type="search" title="검색 버튼" height="18px" />
            <em>Search</em>
          </div>
        </SearchButton>
      </HeaderBar>
    );
  }
}