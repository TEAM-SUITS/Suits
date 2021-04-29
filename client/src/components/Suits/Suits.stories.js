import Suits from './Suits';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Suits',
  component: Suits,
  parameters: {
    docs: {
      description: {
        component: 'Info Page에서 우리 서비스를 소개하는 Suits 탭입니다.',
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <Suits />;

export const Primary = Template.bind({});
