import ScrollToTop from './ScrollToTop';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/ScrollToTop',
  component: ScrollToTop,
  parameters: {
    docs: {
      description: {
        component: 'ScrollToTop 버튼은 스크롤 위치를 페이지의 최상단으로 이동시킵니다.',
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <ScrollToTop />;

export const Primary = Template.bind({});
