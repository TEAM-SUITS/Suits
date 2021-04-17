// 총 누적 좋아요 수가 일정량을 넘으면 주어진 조건에 따라 티어가 업데이트 되도록 설정
const updateTier = async (user) => {
  switch (true) {
    case user.likeCount >= 5 && user.likeCount <= 19:
      user.tier = 2;
      await user.save();
      break;
    case user.likeCount >= 20 && user.likeCount <= 29:
      user.tier = 3;
      await user.save();
      break;
    case user.likeCount >= 30 && user.likeCount <= 49:
      user.tier = 4;
      await user.save();
      break;
    case user.likeCount >= 50 && user.likeCount <= 99:
      user.tier = 5;
      await user.save();
      break;
    case user.likeCount >= 100:
      user.tier = 6;
      await user.save();
      break;
    default:
      break;
  }
};

module.exports = updateTier;
