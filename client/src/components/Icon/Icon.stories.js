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
        "error",
        "success",
        "github",
      ],
    },

    title: {
      description: "아이콘에 마우스를 올려두면 표시될 타이틀",
    },

    height: {
      description: "아이콘 크기(높이)",
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Icon {...args} />;

export const IconVariants = Template.bind({});

IconVariants.args = {
  type: "search",
  title: "검색",
};
