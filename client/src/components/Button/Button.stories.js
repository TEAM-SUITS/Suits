import Button from './Button';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button 컴포넌트는 앱내에서 사용될 커스텀 버튼으로, 아웃라인 그리고 아이콘과 함께 사용가능함',
      },
    },
  },
  argTypes: {
    outline: {
      description: '버튼에 아웃라인을 지정할건지에 대한 여부',
    },

    icon: {
      decription: '버튼 좌측에 추가할 아이콘 이름',
    },

    width: {
      description: '버튼의 너비',
    },
    height: {
      description: '버튼의 높이 ',
    },
    children: {
      description: '버튼에 삽입될 텍스트 (텍스트 노드)',
    },
    isLoading: {
      description: '로딩 상태 여부 ',
    },
    disabled: {
      description: '버튼의 비활성화 여부',
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Button {...args} />;

export const ButtonNoOutline = Template.bind({});
export const ButtonOutline = Template.bind({});
export const ButtonLoading = Template.bind({});
export const ButtonDisabled = Template.bind({});

ButtonNoOutline.args = {
  icon: 'github',
  children: 'Sign In with Github',
};

ButtonOutline.args = {
  icon: 'github',
  children: 'Sign In with Github',
  outline: true,
};

ButtonLoading.args = {
  icon: 'github',
  children: 'Sign In with Github',
  isLoading: true,
};

ButtonDisabled.args = {
  icon: 'github',
  children: 'Sign In with Github',
  disabled: true,
};
