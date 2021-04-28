import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { boxShadow } from 'styles/common/common.styled';

const SliderContainer = styled.div`
  background-color: var(--color-white);
  ${boxShadow};
  width: 100%;
`;
const StyledSlider = styled(Slider)`
  .slick-track {
    max-width: none;
  }
  img {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
  }
  .slick-prev {
    z-index: 5;
    left: 2%;
    &:before {
      color: var(--color-black);
    }

    &:focus {
      outline: 1px solid var(--color-black);
    }
  }
  .slick-next {
    right: 2%;
    &:before {
      color: var(--color-black);
    }

    &:focus {
      outline: 1px solid var(--color-black);
    }
  }
  .slick-dots {
    button:before {
      color: var(--color-text);
    }
  }
`;

/* ---------------------------- styled components --------------------------- */

const adList = [
  {
    name: '데브폴리오',
    src: '/assets/ad-devfolio.png',
    url: 'https://github.com/Devfolio-team/Devfolio-Client',
  },
  {
    name: '산타',
    src: '/assets/ad-santa.png',
    url: 'https://github.com/Santa-Application/App',
  },
  {
    name: '우연히, 식단',
    src: '/assets/ad-diet.png',
    url: 'https://github.com/hyorard-b/forte-diet',
  },
  {
    name: '살롱',
    src: '/assets/ad-salon.png',
    url: 'https://github.com/riding-bom/salon',
  },
];

/* --------------------------------- 광고주 리스트 -------------------------------- */

export default function AdBanner() {
  const AdBannerCarousel = adList.map(({ name, src, url }) => (
    <div key={`item-${name}`}>
      <a
        href={url}
        target="external"
        rel="external"
        aria-label={`새 탭에서 ${name} 사이트 열기`}
      >
        <img src={src} alt={name} />
      </a>
    </div>
  ));

  // 캐러셀 설정
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
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

// 캐러셀 접근성 레퍼런스
// https://nuli.navercorp.com/community/article/1133097
// 가려진 이미지 링크에 초점 이동 가지 않게 수정할 필요 있음.
