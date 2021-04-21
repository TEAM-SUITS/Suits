import Icon from "./Icon";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          "Icon 컴포넌트는 앱내에 필요한 아이콘을 지정해 사용할수 있는 컴포넌트입니다 ",
      },
    },
  },
  argTypes: {
    type: {
      description: "아이콘 타입",
      type: "select",
      options: [
        "search",
        "home",
        "heart",
        "profile",
        "info",
        "profile-active",
        "info-active",
        "heart-active",
        "home-active",
        "search-active",
        "quote-left",
        "quote-right",
        "close",
        "github",
        "swap",
        "mail",
        "refresh",
      ],
      defaultValue: "home",
    },
    title: {
      description: "마우스 오버 시 힌트로 뜰 내용",
      defaultValue: "아이콘",
    },
    height: {
      description: "아이콘 높이",
      defaultValue: "25px",
    },
  },
};

const Template = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "home",
  title: "아이콘",
  height: "25px",
};
/* -------------------------------------------------------------------------- */

export const IconVariants = Template.bind({});

IconVariants.args = {
  type: "search",
  title: "검색",
};
