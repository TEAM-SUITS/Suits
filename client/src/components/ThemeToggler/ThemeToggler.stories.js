import ThemeToggler from './ThemeToggler';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/ThemeToggler',
  component: ThemeToggler,
  parameters: {
    docs: {
      description: {
        component: 'ThemeToggler는 라이트/다크 테마를 변경하는 버튼입니다.',
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <ThemeToggler />;

export const Primary = Template.bind({});
