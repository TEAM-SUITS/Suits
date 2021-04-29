import styled from 'styled-components';
import Portal from 'components/Portal/Portal';
import Dialog from 'components/Dialog/Dialog';
import Profile from 'components/Profile/Profile';
import { bool } from 'prop-types';

/* ---------------------------- styled components --------------------------- */

const FontSizeContainer = styled.div`
  @media screen and (max-width: 480px) {
    h2 {
      font-size: 1.8rem;
    }
    a {
      font-size: 1.2rem;
    }

    .hashtags {
      font-size: 0.8rem;
      margin-left: -1.6em;
    }
  }
`;

/* -------------------------------------------------------------------------- */
export default function ProfileDialog({ isVisible, user, $onClick, $isLoading }) {
  return (
    <Portal id={'dialog-container'}>
      <Dialog
        visible={isVisible} // 상위 컴포넌트의 state로 handle
        infoText="User Profile"
        label="다른 사용자 프로필 조회"
        onClick={$onClick}
        type="profile"
      >
        <FontSizeContainer>
          <Profile
            user={user}
            $isLoading={$isLoading}
            // 상위 컴포넌트로부터 전달 받은
            // 클릭된 유저의 데이터
          />
        </FontSizeContainer>
      </Dialog>
    </Portal>
  );
}

ProfileDialog.propTypes = {
  isVisible: bool.isRequired,
};
