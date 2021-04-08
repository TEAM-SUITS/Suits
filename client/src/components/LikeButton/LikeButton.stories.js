import LikeButton from "./LikeButton";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Button/LikeButton",
  component: LikeButton,
  parameters: {
    docs: {
      description: {
        component:
          "LikeButton 컴포넌트는 좋아요 여부를 나타낼수있는 버튼입니다",
      },
    },
  },
  argTypes: {
    isLiked: {
      control: "boolean",
      description: "좋아요 여부를 나타냄 (좋아요 - 꽉찬하트, 기본 - 빈하트)",
      defaultValue: false,
    },
    type: {
      description: "버튼 타입을 지정",
      type: "select",
      options: ["button", "submit"],
    },
    label: {
      description: "좋아요의 대상을 명시 (답글, 댓글 등) ",
    },
    iconProps: {
      control: {
        type: "object",
      },
      description: "버튼 내부의 아이콘을 세부설정하기 위한 프로퍼티 (객체)",
    },
  },
};

const Template = (args) => <LikeButton {...args} />;

export const ButtonLiked = Template.bind({});
ButtonLiked.args = {
  type: "button",
  isLiked: true,
  label: "답글",
};

export const ButtonNormal = Template.bind({});
ButtonNormal.args = {
  type: "button",
  isLiked: false,
  label: "답글",
};

export const ButtonColorVariant = Template.bind({});
ButtonColorVariant.args = {
  type: "button",
  isLiked: true,
  label: "답글",
  iconProps: { color: "pink" },
};
