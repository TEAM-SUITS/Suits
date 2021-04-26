import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
`;
const StyledSlider = styled(Slider)`
  .slick-track {
    max-width: none;
  }
  img {
    width: 100%;
  }
`;

/* ---------------------------- styled components --------------------------- */

const adList = [
  {
    name: '데브폴리오',
    src: '/assets/adbanner1.png',
    url: 'https://github.com/Devfolio-team/Devfolio-Client',
  },
  {
    name: '산타',
    src: '/assets/adbanner2.png',
    url: 'https://github.com/Santa-Application/App',
  },
  {
    name: '우연히, 식단',
    src: '/assets/adbanner3.png',
    url: 'https://github.com/hyorard-b/forte-diet',
  },
];

/* --------------------------------- 광고주 리스트 -------------------------------- */

export default function AdBanner() {
  const AdBannerCarousel = adList.map(({ name, src, url }) => (
    <div>
      <a href={url} target="external" rel="external">
        <img src={src} alt={name} />
      </a>
    </div>
  ));

  // 캐러셀 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {adList.length ? (
          AdBannerCarousel
        ) : (
          <p>여기에 기본 배너를 사용합시다.</p>
        )}
      </StyledSlider>
    </SliderContainer>
  );
}
