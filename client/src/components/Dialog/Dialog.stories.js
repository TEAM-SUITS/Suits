import Dialog from "./Dialog";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: "Dialog 컴포넌트는 팝업창 역할을 합니다.",
      },
    },
  },
  argTypes: {
    visible: {
      controls: "boolean",
      description:
        "다이얼로그 가시성 여부",
    },
    infoText: {
      description: "다이얼로그 헤딩",
    },
    label: {
      description: "다이얼로그에 부여될 aria-label 값",
    },
    children: {
      description: "다이얼로그에 올 컨텐츠(node 또는 string)",
    },
  },
};

const Template = (args) => <Dialog {...args} />;

export const PrimaryDivider = Template.bind({});
PrimaryDivider.args = {
  visible: true,
  infoText: "test dialog",
  label: "테스트용 다이얼로그",
  children: "다이얼로그 테스트 중입니다.",
};
