import React from 'react';
import styled from 'styled-components';
import Divider from 'components/Divider/Divider';
import Icon from 'components/Icon/Icon';
import Tier from 'components/Tier/Tier';
import { museoMedium, resetList, spoqaLarge, spoqaMedium } from 'styles/common/common.styled';

/* -------------------------------------------------------------------------- */

const StylesHowToUse = styled.section`
  padding: 0 2em;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 70px;
  .box {
    max-width: 500px;
    h3 {
      ${spoqaMedium}
      text-align: center;
      margin: 0;
    }
  }
  @media screen and (min-width: 480px) {
    margin-top: 100px;
    .box {
      &:first-child {
        margin-bottom: 3em;
      }
      h3 {
        ${spoqaLarge}
        font-size: 2rem;
      }
      div {
        margin-bottom: 1.5em;
      }
    }
  }
`;
const StyledFeatureBox = styled.div`
  margin-bottom: 2em;
  ul {
    ${resetList}
    display: flex;
    flex-flow: column nowrap;
    li {
      display: flex;
      margin-bottom: 0.2em;
    }
    span {
      ${spoqaMedium}
      margin: 0 0 0 0.4em;
      flex: 1;
      max-width: 380px;
    }
  }
  @media screen and (max-height: 667px) {
    margin-bottom: 0.6em;
    ul {
      li {
        svg {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 1.5rem;
        }
      }
    }
  }
  @media screen and (min-width: 480px) {
    p {
      ${spoqaLarge}
      font-size: 2rem;
    }
  }
`;

const StyledTierContainer = styled.div`
  margin: 0;
  .tiers {
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
      img {
        width: 100px;
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
  @media screen and (min-width: 480px) {
    .tiers {
      div {
        &:not(:last-child) {
          margin-bottom: 0.4em;
        }
        img {
          width: 120px;
        }
        span {
          width: 250px;
        }
      }
    }
  }
`;

/* ---------------------------- styled components --------------------------- */

const howToUseList = [
  {
    icon: 'home',
    content:
      '랜덤 면접 질문, 랜덤 명언, 좋아요를 가장 많이 받은 사용자, 답변이 가장 많이 달린 면접 질문을 볼 수 있습니다.',
  },
  { icon: 'search', content: '원하는 키워드로 면접 질문을 검색할 수 있습니다.' },
  { icon: 'heart', content: '설정한 관심 키워드에 맞는 면접 질문들을 둘러볼 수 있습니다.' },
  { icon: 'profile', content: '나의 프로필과 내가 작성한 답변을 확인할 수 있습니다.' },
  { icon: 'info', content: '서비스 소개, 계정 관리, 이용 안내를 볼 수 있습니다.' },
];

const tierList = [
  { tier: 1, content: 'Beginner' },
  { tier: 2, content: 'Level 2 / 10+ Likes' },
  { tier: 3, content: 'Level 3 / 20+ Likes' },
  { tier: 4, content: 'Level 4 / 30+ Likes' },
  { tier: 5, content: 'Level 5 / 50+ Likes' },
  { tier: 6, content: 'Master / 99+ Likes' },
];

/* ---------------------------- map으로 출력할 데이터 리스트 --------------------------- */

export default function HowToUse() {
  return (
    <StylesHowToUse>
      <StyledFeatureBox className="box">
        <h3>주요 기능 소개</h3>
        <Divider width="40%" margin="0.5em auto" />
        <ul>
          {howToUseList.map(({ icon, content }) => {
            return (
              <li key={icon}>
                <Icon type={icon} />
                <span>{content}</span>
              </li>
            );
          })}
        </ul>
      </StyledFeatureBox>
      <StyledTierContainer className="box">
        <h3>회원 등급</h3>
        <Divider width="40%" margin="0.5em auto" />
        <div className="tiers">
          {tierList.map(({ tier, content }) => {
            return (
              <div>
                <Tier tier={tier} />
                <span>{content}</span>
              </div>
            );
          })}
        </div>
      </StyledTierContainer>
    </StylesHowToUse>
  );
}
