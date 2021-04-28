import React from 'react';
import logo from './images/logo512.png';
import ahn from './images/ahn.jpeg';
import suh from './images/suh.png';
import park from './images/park.jpeg';
import placeholder from './images/placeholder.png';
import styled from 'styled-components';
import { boxShadow, spoqaLarge, spoqaMedium, textShadow } from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';
import Divider from 'components/Divider/Divider';

const StylesSuits = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20vh;
  .logo {
    width: 100px;
    display: block;
    box-sizing: border-box;
    margin-bottom: 2em;
    border-radius: 50%;
  }
  .heading {
    text-align: center;
    margin: 0 0 1.5em;
    ${spoqaMedium}
    ${textShadow}

    em {
      ${spoqaLarge}
      display: block;
    }
  }
  p {
    text-align: center;
    ${spoqaMedium}
    font-size: 1.6rem;
    margin: 0 0 1em;
  }
  .members__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin-bottom: 2em;
    h3 {
      text-align: center;
      ${spoqaMedium}
      margin: 0 0 1em;
    }
    .members {
      display: flex;
      justify-content: center;
      figure {
        width: 110px;
        margin: 0;
        text-align: center;
        img {
          width: 50px;
          margin-bottom: 0.6em;
          border-radius: 50%;
          ${boxShadow}
        }
        figcaption {
          width: 100%;
          ${spoqaMedium}
        }
      }
    }
  }
  .contact {
    display: flex;
    align-items: center;
    address {
      margin-left: 0.3em;
      ${spoqaMedium}
    }
  }

  @media screen and (min-width: 480px) {
    margin-top: 100px;
    .logo {
      width: 120px;
    }
    .heading {
      font-size: 1.6rem;
      em {
        font-size: 2.4rem;
      }
    }
    p {
      font-size: 1.8rem;
    }
    .members__container {
      h3 {
        font-size: 1.8rem;
      }
      .members {
        figure {
          width: 150px;
          img {
            width: 70px;
          }
        }
      }
    }
  }
`;

export default function Suits() {
  const handleLoaded = (e) => {
    let imgSrc = '';
    switch (e.target.alt) {
      case '안예인':
        imgSrc = ahn;
        break;
      case '서민기':
        imgSrc = suh;
        break;
      case '박재운':
        imgSrc = park;
        break;
      case 'Suits 로고':
        imgSrc = logo;
        break;

      default:
        break;
    }
    e.target.src = imgSrc;
  };

  return (
    <StylesSuits>
      <img src={placeholder} alt="Suits 로고" className="logo" onLoad={handleLoaded} />
      <h3 className="heading">
        기술 면접을 준비하는 단정한 습관<em>Suits</em>
      </h3>
      <p>
        Suits는 예비 개발자분들을 위한
        <br />
        기술 면접 대비 질문, 답변 공유 애플리케이션입니다.
        <br />
        꿈을 향해 가는 당신의 길에 함께 하겠습니다.
        <br />
      </p>
      <Divider />
      <div className="members__container">
        <h3>Made by</h3>
        <div className="members">
          <a href="https://github.com/ahnanne">
            <figure>
              <img src={placeholder} alt="안예인" onLoad={handleLoaded} />

              <figcaption>Ahn Yein</figcaption>
            </figure>
          </a>
          <a href="https://github.com/minki607">
            <figure>
              <img src={placeholder} alt="서민기" onLoad={handleLoaded} />

              <figcaption>Suh Mingee</figcaption>
            </figure>
          </a>
          <a href="https://github.com/fe-kid">
            <figure>
              <img src={placeholder} alt="박재운" onLoad={handleLoaded} />

              <figcaption>Park Jaewoon</figcaption>
            </figure>
          </a>
        </div>
      </div>
      <div className="contact">
        <Icon type="mail" />
        <address>ahnsuhpark@suits.com</address>
      </div>
    </StylesSuits>
  );
}
