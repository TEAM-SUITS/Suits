/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import { pageEffect } from 'styles/motions/variants';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import SearchHeaderBar from 'containers/SearchHeaderBar/SearchHeaderBar';
import Card from 'components/Card/Card';
import QnAContent from 'components/Content/QnAContent';
import { SuityContainer } from 'containers/SuityContainer/SuityContainer.styled';
import { fetchSearchData } from 'redux/storage/search/search';
import styled from 'styled-components';
import { spoqaMedium } from 'styles/common/common.styled';
import { array, string } from 'prop-types';
import { ReactComponent as Spinner } from 'components/Spinner/Spinner.svg';

// scroll to top button
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import handleScroll from 'utils/handleScroll/handleScroll';

/* ---------------------------- styled components --------------------------- */
const InfoImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 300px;
  // mobile
  @media screen and (max-width: 480px) {
    width: 200px;
  }
`;
const InfoMsg = styled.p`
  ${spoqaMedium}
  text-align: center;
  color: var(--color-gray5);
`;

/* ---------------------------------- 검색 영역 --------------------------------- */
function ResultsSection({ result = [], word = '', isLoading, handleRefresh }) {
  // 로딩 중일 때
  if (isLoading) {
    return <Spinner />;
  }

  if (result === null || word === '') {
    return (
      <SuityContainer>
        <InfoImg src="/assets/magnifier.png" alt="검색어 입력 안내" />
        <InfoMsg>검색하실 단어를 입력해주세요.</InfoMsg>
      </SuityContainer>
    );
  }
  // 검색 결과가 존재하지 않을 경우
  if (!isLoading && !result.length) {
    return (
      <SuityContainer>
        <InfoImg src="/assets/empty.png" alt="검색 결과 없음" />
        <InfoMsg>{`"${word}"에 대한 검색 결과가 없습니다.`}</InfoMsg>
      </SuityContainer>
    );
  }
  return (
    <>
      {result.map((data, idx) => (
        <Card key={data._id} qId={data._id} isQuestion={true} isPreview={true} title={data.content} tags={data.hashTag}>
          <QnAContent
            answer={
              // 빈 객체일 경우 false 전달
              data.answers[0].hasOwnProperty('likes') &&
              data.answers.reduce(
                (prev, curr) => {
                  if (curr.likes.length >= prev.likes.length) {
                    return curr;
                  }
                  return prev;
                },
                { likes: [] }
              )
            }
          />
        </Card>
      ))}
    </>
  );
}
/* ------------------------------- Search Page ------------------------------ */
export default function SearchPage() {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);
  const [searchWord, setSearchWord] = useState(searchState.searchWord);
  const [prevSearchWord, setPrevSearchWord] = useState(searchWord);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchSearchData(searchWord, prevSearchWord));
    setRefresh(false);
  }, [searchWord, dispatch, refresh]);
  const handleSearchWord = (e) => {
    // enter -> setSearchWord
    if (e.key === 'Enter') {
      const v = e.target.value;
      setPrevSearchWord(searchWord);
      setSearchWord(v);
    }
  };

  const handleCancelButton = () => {
    setPrevSearchWord(searchWord);
    setSearchWord('');
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  return (
    <>
      <TextHeaderBar page="search" />
      <ScrollToTop handleClick={handleScroll} />
      <PageContainer page="search" variants={pageEffect} initial="hidden" animate="visible">
        <SearchHeaderBar onKeyUp={handleSearchWord} onClick={handleCancelButton} initialWord={searchWord} />
        <TextHeaderBar page="search" />
        <ResultsSection
          result={searchState.searchData}
          word={searchWord}
          isLoading={searchState.isLoading}
          handleRefresh={handleRefresh}
        />
      </PageContainer>
    </>
  );
}
/* -------------------------------- proptypes ------------------------------- */
ResultsSection.propTypes = {
  result: array,
  word: string,
};
