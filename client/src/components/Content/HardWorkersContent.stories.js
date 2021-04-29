import HardWorkersContent from './HardWorkersContent';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Content/HardWorkersContent',
  component: HardWorkersContent,
  parameters: {
    docs: {
      description: {
        component:
          'Hard Workers 메뉴는 Like를 많이 받은 사용자를 홈 화면에 표시하는 데 사용함. 사용자 정보 객체 3개로 이루어진 배열을 props로 받아 출력함',
      },
    },
  },
  argTypes: {
    users: {
      description: 'Like를 많이 받은 사용자의 정보를 담은 3개의 객체 이루어진 배열',
    },
  },
};

const Template = (args) => <HardWorkersContent {...args} />;

export const HardWorkers = Template.bind({});

HardWorkers.args = {
  users: [
    {
      id: 'user1',
      username: 'Kim',
      img: 'https://cdn.pixabay.com/photo/2020/01/23/16/42/embrace-4788167_1280.jpg',
      tier: 4,
    },
    {
      id: 'user2',
      username: 'Lee',
      img: 'https://cdn.pixabay.com/photo/2015/06/04/20/36/girl-797837_1280.jpg',
      tier: 6,
    },
    {
      id: 'user3',
      username: 'Park',
      img: 'https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_1280.jpg',
      tier: 2,
    },
  ],
};

export const HardWorkersLoading = Template.bind({});
HardWorkersLoading.args = {
  users: null,
};
