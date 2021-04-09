import Navigation from "./Navigation";
import { MemoryRouter } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

export default {
  title: "Container/Navigation",
  component: Navigation,
  parameters: {
    docs: {
      description: {
        component:
          "Navigation 컨테이너 컴포넌트는 페이지 상단 메인메뉴이며, 아이콘 컴포넌트로 이루어져 있습니다.",
      },
    },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <Navigation />
  </MemoryRouter>
);

export const Primary = Template.bind({});

