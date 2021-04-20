import MyInfo from './MyInfo';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/MyInfo',
  component: MyInfo,
  parameters: {
    docs: {
      description: {
        component:
          'MyInfo은 사용자 정보를 확인하고 수정할 수 있는 컴포넌트입니다..',
      },
    },
  },
  argTypes: {
    user: {
      description: '사용자 정보를 담은 객체',
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <MyInfo {...args} />;

export const User = Template.bind({});
User.args = {
  user: {
    username: 'Frontendkid',
    avatar:
      'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
    tier: 6,
    githubRepo: 'https://github.com/fe-kid',
    bio: '안녕하세요. 뛰어난 실력과 선한 인품을 가진 프론트엔드 개발자입니다.',
    likeCount: 20,
    hashTag: ['CSS', 'JavaScript', 'Front-End'],
  },
};
