import InfoNav from './InfoNav';
import { MemoryRouter } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Container/InfoNav',
  component: InfoNav,
  parameters: {
    docs: {
      description: {
        component: 'InfoNav은 Info Page 상단의 네비게이션입니다.',
      },
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => (
  <MemoryRouter>
    <InfoNav />
  </MemoryRouter>
);

export const Primary = Template.bind({});
