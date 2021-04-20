import Divider from 'components/Divider/Divider';
import Icon from 'components/Icon/Icon';
import Tier from 'components/Tier/Tier';
import React from 'react';
import styled from 'styled-components';
import {
  museoLarge,
  museoMedium,
  spoqaLarge,
  spoqaMedium,
  spoqaMediumLight,
} from 'styles/common/common.styled';

const StylesHowToUse = styled.section`
  padding: 0 3em;
  .box {
    max-width: 500px;
    margin: 0;
    &:first-child {
      margin-bottom: 2em;
    }
    h2 {
      ${spoqaMedium}
      text-align: center;
      margin: 0;
    }
  }

  .box-feature {
    p {
      ${spoqaMediumLight}
      margin: 0;
    }
  }

  .box-tier {
    .tiers__container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 0.2em;
        }
        svg {
          width: 70px;
          height: 12px;
        }
        span {
          width: 200px;
          text-align: center;
          display: block;
          ${museoMedium}
          font-size: 1.6rem;
        }
      }
    }
  }
  @media screen and (max-height: 667px) {
    .box-feature {
      p {
        svg {
          width: 20px;
          height: 20px;
        }
        font-size: 1.4rem;
      }
    }
  }

  @media screen and (min-width: 480px) {
    .box {
      &:first-child {
        margin-bottom: 4em;
      }
      h2 {
        ${spoqaLarge}
        font-size: 2.4rem;
      }
      hr {
        margin-bottom: 2em;
      }
    }

    .box-feature {
      p {
        ${spoqaLarge}
        font-size: 2rem;
      }
    }

    .box-tier {
      .tiers__container {
        div {
          &:not(:last-child) {
            margin-bottom: 0.4em;
          }
          svg {
            width: 150px;
            height: 22px;
          }
          span {
            width: 250px;
            text-align: center;
            display: block;
            ${museoLarge}
            font-weight: 400;
          }
        }
      }
    }
  }
`;

export default function HowToUse() {
  return (
    <StylesHowToUse>
      <div className="box box-feature">
        <h2>주요 기능 소개</h2>
        <Divider width="40%" margin="0.5em auto" />
        <p>
          <Icon type="home" /> 랜덤 면접 질문, 랜덤 명언, 좋아요를 가장 많이
          받은 사용자, 답변이 가장 많이 달린 면접 질문을 볼 수 있습니다. <br />
          <Icon type="search" /> 원하는 키워드로 면접 질문을 검색할 수 있습니다.
          <br />
          <Icon type="heart" /> 설정한 관심 키워드에 맞는 면접 질문들을 둘러볼
          수 있습니다. <br />
          <Icon type="profile" /> 나의 프로필과 내가 작성한 답변을 확인할 수
          있습니다. <br />
          <Icon type="info" /> 서비스 소개, 나의 정보, 이용 안내를 볼 수
          있습니다. <br />
        </p>
      </div>
      <div className="box box-tier">
        <h2>회원 등급</h2>
        <Divider width="40%" margin="0.5em auto" />
        <div className="tiers__container">
          <div>
            <Tier />
            <span>Beginner</span>
          </div>
          <div>
            <Tier tier={2} />
            <span>Level 2 / 10+ Likes</span>
          </div>
          <div>
            <Tier tier={3} />
            <span>Level 3 / 20+ Likes</span>
          </div>
          <div>
            <Tier tier={4} />
            <span>Level 4 / 30+ Likes</span>
          </div>
          <div>
            <Tier tier={5} />
            <span>Level 5 / 50+ Likes</span>
          </div>
          <div>
            <Tier tier={6} />
            <span>Master / 99+ Likes</span>
          </div>
        </div>
      </div>
    </StylesHowToUse>
  );
}
