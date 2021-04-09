import QnAContent from "./QnAContent";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Content/QnAContent",
  component: QnAContent,
  parameters: {
    docs: {
      description: {
        component:
          "QnAContent 컴포넌트는 질문과 대표 답변을 표시하는데 사용. 카드 컴포넌트의 컨텐츠 부분 영역으로 삽입가능",
      },
    },
  },
  argTypes: {},
};

const Template = (args) => <QnAContent {...args} />;

export const QNAContent = Template.bind({});

QNAContent.args = {
  answer: {
    author: {
      id: "user1",
      username: "Minki607",
      img: "https://avatars.githubusercontent.com/u/40879385?v=4",
      tier: 6,
    },
    content:
      "객체 리터럴과 생성자 함수, 클래스, Object.create() 메서드 등등 많구요 자세한 내용은 뭐 이쪽 링크에서 찾아보심될듯합니다",
    liked: 32,
  },
};
