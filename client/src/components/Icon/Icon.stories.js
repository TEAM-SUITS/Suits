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
<<<<<<< HEAD
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
=======
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
>>>>>>> bba5d847152c9a9e15acbf303487b46802dccca4
    },
  },
};

<<<<<<< HEAD
const Template = (args) => <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: "home",
  title: "아이콘",
  height: "25px",
=======
/* -------------------------------------------------------------------------- */

const Template = (args) => <Icon {...args} />;

export const IconVariants = Template.bind({});

IconVariants.args = {
  type: "search",
  title: "검색",
>>>>>>> bba5d847152c9a9e15acbf303487b46802dccca4
};
