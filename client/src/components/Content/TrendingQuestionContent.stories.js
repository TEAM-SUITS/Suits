import TrendingQuestionContent from "./TrendingQuestionContent";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Content/TrendingQuestionContent",
  component: TrendingQuestionContent,
  parameters: {
    docs: {
      description: {
        component:
          "TrendingQuestionContent 컴포넌트는 최다 답변이 달린 질문들을 표시하기 위한 컨텐츠 영역. 카드 컴포넌트의 컨텐츠 부분 영역으로 삽입가능 ",
      },
    },
  },
};

const Template = (args) => <TrendingQuestionContent {...args} />;

export const TrendingContent = Template.bind({});
