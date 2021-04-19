import Icon from "./Icon";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          "Icon component",
      },
    },
  },
  argTypes: {
    type: {
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
        "close"
      ],
      description: "아이콘 타입을 지정",
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
