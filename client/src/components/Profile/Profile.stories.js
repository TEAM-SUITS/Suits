import Profile from "./Profile";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Profile",
  component: Profile,
  parameters: {
    docs: {
      description: {
        component:
          "Profile은 사용자 정보를 나타나는 컴포넌트이며 프로필 페이지에 표시됩니다.",
      },
    },
  },
  argTypes: {
    user: {
      description: "사용자 정보를 담은 객체",
    },
    $isLoading: {
      description: "유저 정보를 불러오는중인지애 댜한 여부",
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Profile {...args} />;

export const User = Template.bind({});
User.args = {
  user: {
    username: "Frontendkid",
    img:
      "https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg",
    tier: 6,
    github: "https://github.com/fe-kid",
    bio: "안녕하세요. 뛰어난 실력과 선한 인품을 가진 프론트엔드 개발자입니다.",
    like: 20,
    hashtag: ["CSS", "JavaScript", "Front-End"],
  },
};
