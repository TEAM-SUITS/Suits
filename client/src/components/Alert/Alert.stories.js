import Alert from "./Alert";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Alert 컴포넌트는 에러 메세지나 성공 메세지를 보여주는 용도로 사용됩니다",
      },
    },
  },
  argTypes: {
    status: {
      description: "어떤 상태의 alert창을 띄울건지에 대한 여부",
      type: "select",
      options: ["success", "error"],
    },
    message: {
      description: "성공 또는 에러 메시지의 내용",
    },
  },
};

const Template = (args) => <Alert {...args} />;

export const AlertSuccess = Template.bind({});
export const AlertError = Template.bind({});

AlertSuccess.args = {
  status: "success",
  message: "성공적으로 질문이 등록되었습니다",
};

AlertError.args = {
  status: "error",
  message: "질문 등록에 실패하였습니다",
};
