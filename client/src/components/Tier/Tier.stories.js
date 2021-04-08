import Tier from './Tier';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Tier',
  component: Tier,
  parameters: {
    docs: {
      description: {
        component:
          'Tier 컴포넌트는 사용자 등급을 나타내는 넥타이 핀 이미지입니다.',
      },
    },
  },
  argTypes: {
    tier: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
        step: 1,
      },
      description: '(1 ~ 6) 사용자 등급 설정',
      defaultValue: 1,
    },
    width: {
      control: 'number',
      description: '넥타이 핀 이미지 사이즈(width)',
      defaultValue: 100,
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Tier {...args} />;

export const Tier1 = Template.bind({});
Tier1.args = {
  tier: 1,
  width: 100,
};
export const Tier1Small = Template.bind({});
Tier1Small.args = {
  tier: 1,
  width: 43,
};
export const Tier2 = Template.bind({});
Tier2.args = {
  tier: 2,
  width: 100,
};
export const Tier2Small = Template.bind({});
Tier2Small.args = {
  tier: 2,
  width: 43,
};
export const Tier3 = Template.bind({});
Tier3.args = {
  tier: 3,
  width: 100,
};
export const Tier3Small = Template.bind({});
Tier3Small.args = {
  tier: 3,
  width: 43,
};
export const Tier4 = Template.bind({});
Tier4.args = {
  tier: 4,
  width: 100,
};
export const Tier4Small = Template.bind({});
Tier4Small.args = {
  tier: 4,
  width: 43,
};

export const Tier5 = Template.bind({});
Tier5.args = {
  tier: 5,
  width: 100,
};
export const Tier5Small = Template.bind({});
Tier5Small.args = {
  tier: 5,
  width: 43,
};

export const Tier6 = Template.bind({});
Tier6.args = {
  tier: 6,
  width: 100,
};
export const Tier6Small = Template.bind({});
Tier6Small.args = {
  tier: 6,
  width: 43,
};
