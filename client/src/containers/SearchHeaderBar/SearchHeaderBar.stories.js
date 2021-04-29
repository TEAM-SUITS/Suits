import SearchHeaderBar from './SearchHeaderBar';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Container/SearchHeaderBar',
  component: SearchHeaderBar,
  parameters: {
    docs: {
      description: {
        component: 'SearchHeaderBar 컨테이너 컴포넌트는 search 페이지 상단의 헤더 역할을 합니다.',
      },
    },
  },
};

const Template = (args) => <SearchHeaderBar {...args} />;

export const Primary = Template.bind({});
