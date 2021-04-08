import Card from "./Card";
import { QuoteContent } from "../Content/QuotesContent.stories";
import { TrendingQnAContent } from "../Content/TrendingQuestionContent.stories";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "카드 컴포넌트는 컨텐츠를 담는 컨테이너입니다.",
      },
    },
  },
  argTypes: {
    isQuestion: {
      control: "boolean",
      description: "Q&A 카드 여부를 나타냄.",
      defaultValue: false,
    },
    title: {
      description: "컨텐츠 제목을 나타냄.",
    },
    children: {
      description: "카드의 컨텐츠",
    },
  },
};

const Template = (args) => <Card {...args} />;

export const PrimaryCard = Template.bind({});
export const PrimaryQuoteCard = Template.bind({});
export const PrimaryTrendingQNACard = Template.bind({});

PrimaryCard.args = {
  isQuestion: false,
  title: "제목",
};

PrimaryQuoteCard.args = {
  isQuestion: false,
  title: "Wisdom of the day",
  children: <QuoteContent {...QuoteContent.args} />,
};

PrimaryTrendingQNACard.args = {
  isQuestion: false,
  title: "Trending QnA",
  children: <TrendingQnAContent />,
};
