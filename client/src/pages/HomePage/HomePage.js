import React, { useEffect, useState } from 'react';
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHardWorkersData } from 'redux/storage/hardWorkers/hardWorkers';
import { fetchTrendingData } from 'redux/storage/trendingQ/trendingQ';
import { fetchRandomQuoteData } from 'redux/storage/quote/quote';
import { fetchRandomQData } from 'redux/storage/randomQ/randomQ';
import { pageEffect } from 'styles/motions/variants';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import Card from 'components/Card/Card';
import QuotesContent from 'components/Content/QuotesContent';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import HardWorkersContent from 'components/Content/HardWorkersContent';
import KeywordSelect from 'components/KeywordSelect/KeywordSelect';
import useDetectViewport from 'hooks/useDetectViewport';
import QNACardSection from 'components/QNACardSection/QNACardSection';
import AdBanner from 'components/Content/AdBanner';

/* ---------------------------- styled components --------------------------- */

const StyledButtonGroup = styled(ToggleButtonGroup)`
  justify-content: start;
  width: 100%;
  margin-top: 1.2em;

  button {
    color: var(--color-text);
    border: 1px solid var(--color-gray2);
  }
  button:disabled {
    font-weight: 700;
    color: var(--color-gray5);
    background-color: var(--color-gray1);
  }
`;

/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [currentQId, setCurrentQId] = useState('');
  const [quoteLanguage, setQuoteLanguage] = useState('ko');
  const [isSelectingKeywords, setIsSelectingKeywords] = useState(false);
  const { isMobile } = useDetectViewport();

  const dispatch = useDispatch();
  const { currentUserData } = useSelector((state) => state.currentUser);

  const { randomQData, isLoading: isRandomQLoading } = useSelector((state) => state.randomQ);

  const { quoteData, isLoading: isQuoteLoading } = useSelector((state) => state.quote);

  const { workersData, isLoading: isWorkerLoading } = useSelector((state) => state.hardWorkers);

  const { trendingQData, isLoading: isTrendingLoading } = useSelector((state) => state.trendingQ);

  useEffect(() => {
    if (needRefresh) {
      dispatch(fetchRandomQData('refresh', currentQId));
      setNeedRefresh(false);
    }
  }, [dispatch, currentQId, needRefresh]);

  useEffect(() => {
    dispatch(fetchRandomQData('init'));
    dispatch(fetchRandomQuoteData('init'));
    dispatch(fetchTrendingData('init'));
    dispatch(fetchHardWorkersData('init'));

    if (randomQData) setCurrentQId(randomQData[0]._id);
  }, [dispatch, randomQData]);

  // ?????? ?????? ????????? ????????? ?????? ????????? ???????????? ????????? ???????????? ??????
  useEffect(() => {
    if (currentUserData && currentUserData[0].firstLogin) setIsSelectingKeywords(true);
  }, [currentUserData]);

  // ?????????????????? ????????? ?????? ?????? ???????????? ?????? (????????? ???)
  const previewAnswer = (answers) => {
    return answers.reduce(
      (prev, curr) => {
        if (curr.likes.length >= prev.likes.length) {
          return curr;
        }
        return prev;
      },
      { likes: [] }
    );
  };

  return (
    <>
      {isSelectingKeywords && (
        <KeywordSelect userKeywords={currentUserData[0].hashTag} onClose={() => setIsSelectingKeywords(false)} />
      )}

      <TextHeaderBar page="home" />
      <PageContainer page="home" variants={pageEffect} initial="hidden" animate="visible">
        <AdBanner />

        {/* ?????? QnA ?????? ?????? */}

        <QNACardSection
          content="randomQ"
          isLoading={isRandomQLoading}
          cardData={randomQData}
          isMobile={isMobile}
          previewAnswer={previewAnswer}
          refreshData={() => dispatch(fetchRandomQData())}
          handleRefresh={() => setNeedRefresh(true)}
        />

        {/* ?????? ?????? ?????? */}
        <Card title="Wisdom Of The Day">
          {<QuotesContent textCenter quote={quoteData} lang={quoteLanguage} $isLoading={isQuoteLoading} />}
          <StyledButtonGroup exclusive value={quoteLanguage} onChange={(_, value) => setQuoteLanguage(value)}>
            <ToggleButton value="ko" aria-label="????????? ?????? ??????" disabled={quoteLanguage === 'ko'}>
              ko
            </ToggleButton>
            <ToggleButton value="en" aria-label="?????? ?????? ??????" disabled={quoteLanguage === 'en'}>
              en
            </ToggleButton>
          </StyledButtonGroup>
        </Card>
        {/* ?????? ????????? ?????? ?????? */}

        <Card title="Hard Workers">
          <HardWorkersContent users={workersData} $isLoading={isWorkerLoading} />
        </Card>

        {/* ????????? ?????? ???3 */}
        <QNACardSection content="trendingQ" cardData={trendingQData} isLoading={isTrendingLoading} />
      </PageContainer>
    </>
  );
}
