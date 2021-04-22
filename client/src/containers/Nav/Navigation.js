import React from 'react';
import Navbar from './Navigation.styled';
import Icon from 'components/Icon/Icon';
import useDetectViewport from 'hooks/useDetectViewport';
import { useLocation } from 'react-router';

/* -------------------------------------------------------------------------- */

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isMobile } = useDetectViewport();

  return (
    <Navbar ismobile={isMobile}>
      <Navbar.ItemLink exact to="/">
        <Icon title="메인" type={pathname === '/' ? 'home-active' : 'home'} />
      </Navbar.ItemLink>
      <Navbar.ItemLink to="/search">
        <Icon
          title="검색"
          type={pathname === '/search' ? 'search-active' : 'search'}
        />
      </Navbar.ItemLink>
      <Navbar.ItemLink to="/follow">
        <Icon
          title="팔로잉 해시태그"
          type={pathname === '/follow' ? 'heart-active' : 'heart'}
        />
      </Navbar.ItemLink>
      <Navbar.ItemLink to="/profile">
        <Icon
          title="프로필"
          type={pathname === '/profile' ? 'profile-active' : 'profile'}
        />
      </Navbar.ItemLink>
      <Navbar.ItemLink to="/info">
        <Icon
          title="더보기 메뉴"
          type={pathname.includes('/info') ? 'info-active' : 'info'}
        />
      </Navbar.ItemLink>
    </Navbar>
  );
};

export default Navigation;
