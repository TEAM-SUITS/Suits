import QnADialog from './QnADialog';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Dialog',
  component: QnADialog,
  parameters: {
    docs: {
      description: {
        component:
          'QnADialog 컴포넌트는 질문과 답변, 답변 등록까지 한 질문에 대한 상세 정보를 보여주는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    question: {
      description: '질문',
    },
    isVisible: {
      description: '다이얼로그 표시 여부',
    },
  },
};

const Template = (args) => <QnADialog {...args} />;

export const QnA = Template.bind({});

QnA.args = {
  isVisible: true,
  question: {
    content: '객체 리터럴 생성 방식에 대해 설명해보시오',
    keywords: ['CSS', 'JavaScript', 'Database'],
    answer: [
      {
        author: {
          id: 'user1',
          username: 'Minki607',
          img: 'https://avatars.githubusercontent.com/u/40879385?v=4',
          tier: 6,
        },
        content:
          '객체 리터럴과 생성자 함수, 클래스, Object.create() 메서드 등등 많구요 자세한 내용은 뭐 이쪽 링크에서 찾아보심될듯합니다',
        liked: 32,
      },
      {
        author: {
          id: 'user2',
          username: 'frontendkid',
          img: 'https://cdn.pixabay.com/photo/2021/03/25/14/00/horse-6123173_1280.jpg',
          tier: 3,
        },
        content:
          '저는 프론트엔드 개발에 대해 아무 것도 모르니까요 저한테 묻지 마시고요. 제가 잘 아는 동생이 있는데 그 친구는 매우 뛰어난 개발자니까 함 물어보심될듯합니다.',
        liked: 20,
      },
    ],
  },
};
