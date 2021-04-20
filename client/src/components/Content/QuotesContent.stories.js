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
    quote: {
      description:
        "명언 정보가 담긴 객체, 번역된 명언, 원문 명언, 저자가 필요 ",
    },
    textCenter: {
      control: "boolean",
      description: "명언 중간 정렬 여부",
    },
    lang: {
      description: "명언 언어",
    },
  },
};

const Template = (args) => <QuotesContent {...args} />;

export const QuoteContent = Template.bind({});

QuoteContent.args = {
  author: "Brian Tracey",
  lang: "en",
  textCenter: true,
  quote: {
    content: {
      original:
        "There are no limits to what you can accomplish, except the limits you place on your own thinking",
      translated: "번역된 명언",
    },
    author: "Brian Tracey",
  },
};
