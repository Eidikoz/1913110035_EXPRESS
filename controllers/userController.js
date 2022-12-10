const index = (req, res, next) => {
  return res.status(200).json({ fullname: "Pongpanot" });
};

const bio = (req, res, next) => {
  return res.status(200).json({
    fullname: "Pongpanot Hewolgate",
    nickname: "Stang",
    hobby: "Lying on the bed",
    gitusername: "Eidikoz",
  });
};

module.exports = { index: index, bio: bio };
