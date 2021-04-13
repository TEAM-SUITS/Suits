import Hashtag from './Hashtag';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Hashtag',
  component: Hashtag,
  parameters: {
    docs: {
      description: {
        component: 'HashTag는 사용자가 선택한 관심 키워드를 나타냅니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      option: [
        'CSS',
        'JavaScript',
        'OS',
        'Database',
        'Network',
        'Front-End',
        'Back-End',
        'All',
      ],
      description: '관심 키워드 지정',
    },
    isSelected: {
      control: 'boolean',
      description:
        '관심 키워드로 선택 전 - 타입별 배경색 적용, 선택 후 - 회색 배경 적용',
      defaultValue: false,
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Hashtag {...args} />;

export const CSS = Template.bind({});
CSS.args = {
  type: 'CSS',
};
export const CSSSelected = Template.bind({});
CSSSelected.args = {
  type: 'CSS',
  isSelected: true,
};

export const JavaScript = Template.bind({});
JavaScript.args = {
  type: 'JavaScript',
};
export const JavaScriptSelected = Template.bind({});
JavaScriptSelected.args = {
  type: 'JavaScript',
  isSelected: true,
};

export const OS = Template.bind({});
OS.args = {
  type: 'OS',
};
export const OSSelected = Template.bind({});
OSSelected.args = {
  type: 'OS',
  isSelected: true,
};

export const Database = Template.bind({});
Database.args = {
  type: 'Database',
};
export const DatabaseSelected = Template.bind({});
DatabaseSelected.args = {
  type: 'Database',
  isSelected: true,
};

export const Network = Template.bind({});
Network.args = {
  type: 'Network',
};
export const NetworkSelected = Template.bind({});
NetworkSelected.args = {
  type: 'Network',
  isSelected: true,
};

export const FrontEnd = Template.bind({});
FrontEnd.args = {
  type: 'Front-End',
};
export const FrontEndSelected = Template.bind({});
FrontEndSelected.args = {
  type: 'Front-End',
  isSelected: true,
};

export const BackEnd = Template.bind({});
BackEnd.args = {
  type: 'Back-End',
};
export const BackEndSelected = Template.bind({});
BackEndSelected.args = {
  type: 'Back-End',
  isSelected: true,
};

export const All = Template.bind({});
All.args = {
  type: 'All',
};
export const AllSelected = Template.bind({});
AllSelected.args = {
  type: 'All',
  isSelected: true,
};
