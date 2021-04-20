import HowToUse from '../HowToUse/HowToUse';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/HowToUse',
  component: HowToUse,
  parameters: {
    docs: {
      description: {
        component: 'Info Page에서 이용 방법을 안내하는 탭입니다.',
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <HowToUse />;

export const Primary = Template.bind({});
