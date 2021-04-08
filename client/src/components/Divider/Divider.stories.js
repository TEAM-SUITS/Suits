import Divider from "./Divider";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: "Divider 컴포넌트는 주제가 다른 컨텐츠를 구분하는 역활을 함",
      },
    },
  },
  argTypes: {
    primary: {
      controls: "boolean",
      description:
        "메인 구분선 여부 확인. 메인 구분선일시 color 속성 무시하고 테마(오렌지 계열 적용)",
    },
    height: {
      description: "구분선의 높이(두께를 나타냄",
    },
    width: {
      description: "구분선의 너비를 나타냄",
    },
    color: {
      description: "구분선의 색을 나타냄",
    },
    margin: {
      description: "컨텐츠 사이의 간격을 나타냄",
    },
  },
};

const Template = (args) => <Divider {...args} />;

export const PrimaryDivider = Template.bind({});
export const NormalDivider = Template.bind({});

PrimaryDivider.args = {
  primary: true,
  height: "1px",
  width: "100%",
  margin: "50px 0px",
};

NormalDivider.args = {
  primary: false,
  color: "gray",
  height: "1px",
  width: "200px",
};
