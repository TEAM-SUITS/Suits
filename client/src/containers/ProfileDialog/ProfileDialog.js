import styled from 'styled-components';
import Portal from 'components/Portal/Portal';
import Dialog from 'components/Dialog/Dialog';
import Profile from 'components/Profile/Profile';
import { bool } from 'prop-types';

/* ---------------------------- styled components --------------------------- */
const mockUser = {
  username : "Frontendkid",
  img : "https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg",
  tier : 6,
  github : "https://github.com/fe-kid",
  bio : "안녕하세요. 뛰어난 실력과 선한 인품을 가진 프론트엔드 개발자입니다.",
  like : 20,
  hashtag : ["CSS", "JavaScript", "Front-End"],
};

/* -------------------------------------------------------------------------- */
export default function ProfileDialog({ isVisible }) {
  return (
    <Portal id={'dialog-container'}>
      <Dialog
        visible={isVisible} // 상위 컴포넌트의 state로 handle
        infoText="Profile"
        label="다른 사용자 프로필 조회"
      >
        <Profile
          user={mockUser}
          // 상위 컴포넌트로부터 전달 받은
          // 클릭된 유저의 데이터
        />
      </Dialog>
    </Portal>
  );
}

ProfileDialog.propTypes = {
  isVisible: bool.isRequired,
};
