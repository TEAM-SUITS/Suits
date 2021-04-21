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
