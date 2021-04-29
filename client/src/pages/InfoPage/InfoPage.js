import React from 'react';
import { Route } from 'react-router-dom';
import { pageEffect } from 'styles/motions/variants';
import PageContainer from 'containers/PageContainer/PageContainer.styled';
import TextHeaderBar from 'containers/TextHeaderBar/TextHeaderBar';
import InfoNav from 'containers/InfoNav/InfoNav';
import Suits from 'components/Suits/Suits';
import MyInfo from 'components/MyInfo/MyInfo';
import HowToUse from 'components/HowToUse/HowToUse';

/* -------------------------------------------------------------------------- */

export default function InfoPage({ match }) {
  return (
    <>
      <TextHeaderBar />
      <PageContainer variants={pageEffect} initial="hidden" animate="visible">
        <InfoNav />
        <Route path={match.path} exact component={Suits} />
        <Route path={match.path + '/suits'} component={Suits} />
        <Route path={match.path + '/my-info'} component={MyInfo} />
        <Route path={match.path + '/how-to-use'} component={HowToUse} />
      </PageContainer>
    </>
  );
}
