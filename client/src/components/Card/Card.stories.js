import Card from './Card';
import { QuoteContent } from '../Content/QuotesContent.stories';
import { TrendingQnAContent } from '../Content/TrendingQuestionContent.stories';
import { QNAContent } from '../Content/QnAContent.stories';
import { HardWorkers } from 'components/Content/HardWorkersContent.stories';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Card',
  component: Card,

  parameters: {
    docs: {
      description: {
        component: '카드 컴포넌트는 컨텐츠를 담는 컨테이너입니다.',
      },
    },
  },
  argTypes: {
    isQuestion: {
      control: 'boolean',
      description: 'Q&A 카드 여부를 나타냄.',
      defaultValue: false,
    },
    title: {
      description: '컨텐츠 제목을 나타냄.',
    },
    isDialog: {
      description: '카드가 다이얼로그로 쓰일껀지에 대한 여부',
    },
    tags: {
      description: '카드에 명시될 태그를 보여주기 위한 용도',
    },
    hasButton: {
      description: '카드 위에 버튼을 추가할경우 마진을 주기 위한용도',
    },
    children: {
      description: '카드의 컨텐츠',
    },
  },
};

const Template = (args) => <Card {...args} />;

export const PrimaryCard = Template.bind({});
export const PrimaryQuoteCard = Template.bind({});
export const PrimaryTrendingQNACard = Template.bind({});
export const PrimaryQNACard = Template.bind({});
export const PrimaryHardWorkersCard = Template.bind({});

PrimaryCard.args = {
  isQuestion: false,
  title: '제목',
};

PrimaryQuoteCard.args = {
  isQuestion: false,
  title: 'Wisdom of the day',
  children: <QuoteContent {...QuoteContent.args} />,
};

PrimaryTrendingQNACard.args = {
  isQuestion: false,
  title: 'Trending QnA',
  children: <TrendingQnAContent />,
};

PrimaryQNACard.args = {
  isQuestion: true,
  title: '객체 리터럴 생성 방식에 대해 설명해보시오',
  children: <QNAContent {...QNAContent.args} />,
};

PrimaryHardWorkersCard.args = {
  isQuestion: true,
  title: 'Hard Workers',
  children: <HardWorkers {...HardWorkers.args} />,
};
