import QuotesContent from "./QuotesContent";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/Content/QuotesContent",
  component: QuotesContent,
  parameters: {
    docs: {
      description: {
        component:
          "QuotesContent 컴포넌트는 명언을 표시하는데 사용. 카드 컴포넌트의 컨텐츠 부분 영역으로 삽입가능",
      },
    },
  },
  argTypes: {
    cite: {
      description: "출처를 명시하는데 사용",
    },
    author: {
      description: "저자를 명시",
    },
    textCenter: {
      control: "boolean",
      description: "명언 중간 정렬 여부",
    },
    lang: {
      description: "명언 언어",
    },
    children: {
      description: "명언(내용)을 명시",
    },
  },
};

const Template = (args) => <QuotesContent {...args} />;

export const QuoteContent = Template.bind({});

QuoteContent.args = {
  cite: "N/A",
  author: "Brian Tracey",
  lang: "en",
  textCenter: true,
  children:
    "There are no limits to what you can accomplish, except the limits you place on your own thinking",
};
