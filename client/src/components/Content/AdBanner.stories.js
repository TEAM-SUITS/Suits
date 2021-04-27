import AdBanner from './AdBanner';

/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Content/AdBanner',
  component: AdBanner,
  parameters: {
    docs: {
      description: {
        component: '홈 화면에 표시되는 광고 배너',
      },
    },
  },
};

const Template = (args) => <AdBanner {...args} />;

export const AdvertiseBanner = Template.bind({});
