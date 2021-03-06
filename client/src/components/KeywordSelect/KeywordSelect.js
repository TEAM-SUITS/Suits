import React, { useState } from 'react';
import styled from 'styled-components';
import { array, func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchCurrentUserData } from 'redux/storage/currentUser/currentUser';
import { setError } from 'redux/storage/error/error';
import Portal from 'components/Portal/Portal';
import axios from 'axios';
import Hashtag from 'components/Hashtag/Hashtag';
import { resetList, resetBoxModel, spoqaLarge, spoqaMedium } from 'styles/common/common.styled';

/* -------------------------------------------------------------------------- */

const Container = styled.div`
  button {
    background-color: transparent;
    border: none;
    ${spoqaLarge}
    position: fixed;
    top: 1.5em;
    z-index: 999;
    cursor: pointer;
    @media screen and (min-width: 480px) {
      font-size: 2.5rem;
    }
  }
`;
const Backdrop = styled.div.attrs(() => ({
  className: 'dim',
  role: 'presentation',
}))`
  max-width: 100%;
  z-index: 998;
  background-color: var(--color-black);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: ${(props) => props.$opacity};
  backdrop-filter: blur(20px) opacity(0.8);
`;

const DialogContainer = styled.div.attrs((props) => ({
  role: 'dialog',
  ariaModal: 'true',
  ariaLable: props.label,
}))`
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledList = styled.ul`
  ${resetList};
  display: flex;
  flex-flow: column nowrap;
  height: 60vh;
  justify-content: space-around;
  li {
    div {
      font-size: 1.8rem;
      @media screen and (min-width: 480px) {
        font-size: 3rem;
      }
    }
  }
`;

const InfoTextContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  text-align: center;
  margin-top: 5rem;

  > p {
    color: var(--color-white);
    ${spoqaMedium}
    ${resetBoxModel}
    white-space: nowrap;
  }
`;

const CancelButton = styled.button`
  color: var(--color-gray4);
  left: 1.5em;
`;

const DoneButton = styled.button`
  color: var(--color-white);
  right: 1.5em;
`;

/* ---------------------------- styled components ---------------------------- */

export default function KeywordSelect({ userKeywords, onClose }) {
  const [selectedKeywords, setSelectedKeywords] = useState(userKeywords.length ? userKeywords : []);
  const keywordArray = ['CSS', 'JavaScript', 'OS', 'Database', 'Network', 'Front-End', 'Back-End'];

  const dialogRef = React.useRef(null);

  const dispatch = useDispatch();

  // a11y
  React.useEffect(() => {
    const dialogNode = dialogRef.current;
    dialogNode.setAttribute('tabIndex', -1);
    dialogNode.focus();

    // ??????????????? ?????? ????????? ????????? ????????????????????? ????????? ????????? ??????
    const rootNode = document.getElementById('root');
    rootNode.setAttribute('aria-hidden', true);
    rootNode.style.userSelect = 'none';
    rootNode.style.filter = 'blur(3px)';

    const handleFocusTrap = (e) => {
      // ??????????????? ??????
      // const dialogNode = dialogRef.current;
      // focusable nodes "inside" dialogNode
      const focusableNodeList = dialogNode.querySelectorAll('a, button, input, select, textarea'); // ????????? a ????????? href ???????????? tabindex ????????? ????????? focusable???.

      // ??? ?????? ????????? ????????? ????????? ????????? ????????? ??????????????????
      // ?????????????????? ????????? ?????? ??? ??????????????? ????????? ???????????? ????????? ??? ??????.
      const firstFocusNode = focusableNodeList[0];
      const lastFocusNode = focusableNodeList[focusableNodeList.length - 1];

      // ??? ?????? ????????? ???????????? shift + tab ????????? ?????????? -> ????????? ????????? ????????? ??????!
      if (e.target === firstFocusNode && e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        lastFocusNode.focus();
      }

      // ????????? ????????? ???????????? tab ?????????? -> ??? ?????? ????????? ????????? ??????!
      if (e.target === lastFocusNode && !e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        firstFocusNode.focus();
      }
    };

    window.addEventListener('keydown', handleFocusTrap);

    // clean-up function
    return () => {
      dialogNode.removeAttribute('tabIndex');
      rootNode.removeAttribute('aria-hidden');
      window.removeEventListener('keydown', handleFocusTrap);
      rootNode.style.userSelect = 'auto';
      rootNode.style.filter = '';
    };
  }, []);

  const handleClick = (keyword) => {
    const isSelected = selectedKeywords.indexOf(keyword) > -1;

    if (isSelected) {
      // remove keyword
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else {
      // add keyword
      if (selectedKeywords.length >= 3) return;
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const submitSelectedKeywords = async () => {
    try {
      if (userKeywords !== selectedKeywords) {
        await axios.patch('/api/user-profile/hashtag', {
          hashTag: selectedKeywords,
        });
        await axios.patch('/api/user-profile/first-login', {
          firstLogin: false,
        });
        dispatch(fetchCurrentUserData());
      }
    } catch (err) {
      dispatch(setError('?????? ???????????? ???????????? ??? ????????? ??????????????????.'));
      setSelectedKeywords(userKeywords.length ? userKeywords : []);
    } finally {
      onClose();
    }
  };

  const cancelKeywordSelect = () => {
    setSelectedKeywords(userKeywords.length ? userKeywords : []);
    onClose();
  };

  return (
    <Portal id={'dialog-container'}>
      <Container ref={dialogRef} label="?????? ????????? ?????? ???????????????">
        <CancelButton onClick={cancelKeywordSelect}>Cancel</CancelButton>
        <Backdrop $opacity={0.8} />
        <DialogContainer>
          <StyledList>
            {keywordArray.map((keyword) => {
              return (
                <li key={keyword}>
                  <Hashtag
                    type={keyword}
                    isSelected={selectedKeywords.indexOf(keyword) === -1}
                    isButton={true}
                    clicked={() => {
                      handleClick(keyword);
                    }}
                  />
                </li>
              );
            })}
          </StyledList>
          <InfoTextContainer>
            <p>?????? ????????????</p>
            <p>3????????? ???????????? ??? ?????????!</p>
          </InfoTextContainer>
        </DialogContainer>
        <DoneButton onClick={submitSelectedKeywords}>done</DoneButton>
      </Container>
    </Portal>
  );
}

/* ------------------------------- prop types ------------------------------- */

KeywordSelect.propTypes = {
  userKeywords: array,
  onDone: func,
  onCancel: func,
};
