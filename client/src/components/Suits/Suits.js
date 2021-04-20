import React from 'react';
import logo from './images/logo512.png';
import ahn from './images/ahn.jpeg';
import suh from './images/suh.png';
import park from './images/park.jpeg';
import styled from 'styled-components';
import {
  boxShadowBlack,
  spoqaLarge,
  spoqaMediumLight,
  textShadowBlack,
} from 'styles/common/common.styled';
import Icon from 'components/Icon/Icon';

const StylesSuits = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-top: 5em;

  .logo {
    width: 100px;
    display: block;
    box-sizing: border-box;
    margin-bottom: 2em;
  }
  .heading {
    text-align: center;
    margin: 0 0 1.5em;
    ${spoqaMediumLight}
    ${textShadowBlack}

    em {
      ${spoqaLarge}
      display: block;
    }
  }
  p {
    text-align: center;
    ${spoqaMediumLight}
    font-size: 1.6rem;
    margin: 0 0 2em;
  }
  .members__container {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin-bottom: 2em;
    h3 {
      text-align: center;
      ${spoqaMediumLight}
      margin: 0 0 1em;
    }
    .members {
      display: flex;
      justify-content: center;
      figure {
        width: 100px;
        margin: 0;
        text-align: center;
        img {
          width: 50px;
          margin-bottom: 0.6em;
          border-radius: 50%;
          ${boxShadowBlack}
        }
        figcaption {
          width: 100%;
          ${spoqaMediumLight}
        }
      }
    }
  }
  .contact {
    display: flex;
    align-items: center;
    address {
      margin-left: 0.3em;
      ${spoqaMediumLight}
    }
  }

  @media screen and (min-width: 480px) {
    .logo {
      width: 150px;
      margin-bottom: 3em;
    }
    .heading {
      margin: 0 0 2em;
      font-size: 2rem;
      em {
        font-size: 2.8rem;
      }
    }
    p {
      font-size: 2rem;
      margin: 0 0 3em;
    }
    .members__container {
      margin-bottom: 4em;
      h3 {
        font-size: 2rem;
        margin: 0 0 1em;
      }
      .members {
        figure {
          width: 150px;
          img {
            width: 80px;
            margin-bottom: 0.6em;
            border-radius: 50%;
          }
          figcaption {
            width: 100%;
            font-size: 2rem;
          }
        }
      }
    }
    .contact {
      address {
        font-size: 2rem;
      }
    }
  }
`;

export default function Suits() {
  return (
    <StylesSuits>
      <img src={logo} alt="Suits 로고" className="logo" />
      <h2 className="heading">
        기술 면접을 준비하는 단정한 습관<em>Suits</em>
      </h2>
      <p>
        Suits는 예비 개발자분들을 위한
        <br />
        기술 면접 대비 질문, 답변 공유 애플리케이션입니다.
        <br />
        꿈을 향해 가는 당신의 길에 함께 하겠습니다.
        <br />
      </p>
      <div className="members__container">
        <h3>Made by</h3>
        <div className="members">
          <a href="https://github.com/ahnanne">
            <figure>
              <img src={ahn} alt="안예인" />

              <figcaption>Ahn Yein</figcaption>
            </figure>
          </a>
          <a href="https://github.com/minki607">
            <figure>
              <img src={suh} alt="서민기" />

              <figcaption>Suh Mingee</figcaption>
            </figure>
          </a>
          <a href="https://github.com/fe-kid">
            <figure>
              <img src={park} alt="박재운" />

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
