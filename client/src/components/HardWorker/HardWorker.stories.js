import HardWorker from './HardWorker';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/HardWorker',
  componrnt: HardWorker,
  parameters: {
    docs: {
      description: {
        component: 'Hard Workers 컨텐츠에 들어갈 각각의 Hard Worker 정보입니다.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: '사용자 ID',
    },
    img: {
      control: 'text',
      description: '프로필 이미지 소스 URL',
      defaultValue: 'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
    },
    username: {
      control: 'text',
      description: '사용자 이름(Username)',
      defaultValue: 'username',
    },
    tier: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
        step: 1,
      },
      description: '(1 ~ 6) 사용자 등급 설정',
      defaultValue: 1,
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <HardWorker {...args} />;

export const User1 = Template.bind({});
User1.args = {
  id: 'user1',
  img: 'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
  username: 'bluemonster',
  tier: 3,
};

export const User2 = Template.bind({});
User2.args = {
  id: 'user2',
  img: 'https://cdn.pixabay.com/photo/2021/02/23/11/06/mountains-6043079_1280.jpg',
  username: 'mountaingod',
  tier: 6,
};

export const User3 = Template.bind({});
User3.args = {
  id: 'user3',
  img: 'https://cdn.pixabay.com/photo/2017/12/23/17/54/hand-3035665_1280.jpg',
  username: 'handinhand',
  tier: 1,
};
