import HeaderBar from "./HeaderBar";

/* -------------------------------------------------------------------------- */

export default {
  title: "Container/HeaderBar",
  component: HeaderBar,
  parameters: {
    docs: {
      description: {
        component:
          "HeaderBar 컨테이너 컴포넌트는 각 페이지 상단의 헤더 역할을 합니다.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Header 영역에 표시될 컨텐츠(검색 페이지 외에는 모두 span 요소)",
    },
  },
};

const Template = (args) => <HeaderBar {...args} />;

export const Primary = Template.bind({});

