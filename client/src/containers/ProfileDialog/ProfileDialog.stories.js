import ProfileDialog from "./ProfileDialog";

/* -------------------------------------------------------------------------- */

export default {
  title: "Container/ProfileDialog",
  component: ProfileDialog,
  parameters: {
    docs: {
      description: {
        component:
          "ProfileDialog 컨테이너 컴포넌트는 다른 사용자의 프로필을 조회할 때 보여지는 다이얼로그입니다.",
      },
    },
    argTypes: {
      isVisble: {
        control: {
          type: 'boolean',
        },
        description: '다이얼로그 컴포넌트 visible 여부',
        defaultValue: true,
      },
    },
  },
};

const Template = (args) => <ProfileDialog {...args} />

export const Primary = Template.bind({});
