import LinkA from "./LinkA";

/* -------------------------------------------------------------------------- */

export default {
  title: "Components/LinkA",
  component: LinkA,
  parameters: {
    docs: {
      description: {
        component:
          "LinkA 컴포넌트는 앱내에서 사용될 커스텀 Anchor 링크로 외부링크 여부, 아웃라인 그리고 아이콘과 함께 사용가능함    ",
      },
    },
  },
  argTypes: {
    href: {
      description: "링크 주소",
    },

    external: {
      description:
        "외부 링크 여부. 외부 링크일시 보안을 위해 rel= noopener noreferrer 설정",
    },

    outline: {
      description: "",
    },

    icon: {
      decription: "링크 좌측에 추가할 아이콘 이름",
    },
    width: {
      description: "링크 컨텐츠 너비",
    },
    height: {
      description: "링크 컨텐츠 높이 ",
    },
    children: {
      description: "링크 내용 (텍스트 노드)",
    },
  },
};

/* -------------------------------------------------------------------------- */

const Template = (args) => <LinkA {...args} />;

export const LinkAnchor = Template.bind({});
export const ExternalLinkAnchor = Template.bind({});
export const LinkAnchorOutline = Template.bind({});

LinkAnchor.args = {
  href: "https://github.com/",
  external: false,
  icon: "github",
  children: "깃헙 바로가기",
};

ExternalLinkAnchor.args = {
  href: "https://github.com/",
  external: true,
  icon: "github",
  children: "깃헙 바로가기",
};

LinkAnchorOutline.args = {
  href: "https://github.com/",
  external: true,
  outline: true,
  icon: "github",
  children: "깃헙 바로가기",
};
