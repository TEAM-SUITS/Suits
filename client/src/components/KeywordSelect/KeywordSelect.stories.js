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
    keywordArray: {
      description: '선택할 수 있는 키워드 목록',
    },
    userKeywords: {
      description: '사용자가 기존에 선택한 키워드 목록',
    },
  },
};

const Template = (args) => <KeywordSelect {...args} />;

export const NoPreviousSelect = Template.bind({});
NoPreviousSelect.args = {
  keywordArray: [
    'CSS',
    'JavaScript',
    'OS',
    'Database',
    'Network',
    'Front-End',
    'Back-End',
  ],
  userKeywords: [],
};

export const HasUserSelected = Template.bind({});
HasUserSelected.args = {
  keywordArray: [
    'CSS',
    'JavaScript',
    'OS',
    'Database',
    'Network',
    'Front-End',
    'Back-End',
  ],
  userKeywords: ['CSS', 'Database'],
};
