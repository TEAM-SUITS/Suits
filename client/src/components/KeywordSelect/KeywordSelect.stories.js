import KeywordSelect from './KeywordSelect';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/KeywordSelect',
  component: KeywordSelect,
  parameters: {
    docs: {
      description: {
        component: '관심 키워드를 선택하는 다이얼로그 창입니다.',
      },
    },
  },
  argTypes: {
    userKeywords: {
      description: '사용자가 기존에 선택한 키워드 목록',
    },
  },
};

const Template = (args) => <KeywordSelect {...args} />;

export const primary = Template.bind({});
primary.args = {
  userKeywords: ['CSS', 'JavaScript'],
};
