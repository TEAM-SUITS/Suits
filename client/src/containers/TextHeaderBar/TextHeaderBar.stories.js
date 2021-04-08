import TextHeaderBar from "./TextHeaderBar";
import { MemoryRouter } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

export default {
  title: "Container/TextHeaderBar",
  component: TextHeaderBar,
  parameters: {
    docs: {
      description: {
        component:
          "TextHeaderBar 컨테이너 컴포넌트는 home, liked, profile, info 페이지 상단의 헤더 역할을 합니다.",
      },
    },
  },
  argTypes: {
    page: {
      description: "헤더바가 어느 페이지에서 쓰일 것인지 지정",
      type: "select",
      options: ["home", "liked", "profile", "info"],
    },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <TextHeaderBar {...args} />
  </MemoryRouter>
);
// 참고 : https://github.com/storybookjs/storybook/issues/8892#issuecomment-580842862,
// https://stackoverflow.com/questions/58948812/error-invariant-failed-you-should-not-use-link-outside-a-router-storybook

export const Primary = Template.bind({});
Primary.args = {
  page: "",
};
