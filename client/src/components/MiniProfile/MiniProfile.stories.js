import MiniProfile from './MiniProfile';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/MiniProfile',
  component: MiniProfile,
  parameters: {
    docs: {
      description: {
        component: 'MiniProfile은 QnA 답변란에 표시되는 작성자의 정보입니다.',
      },
    },
  },
  argTypes: {
    user: {
      description: '답변을 작성한 유저 정보',
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <MiniProfile {...args} />;

export const User = Template.bind({});
User.args = {
  user: {
    id: 'user1',
    username: 'Frontendkid',
    img:
      'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
    tier: 6,
  },
};
