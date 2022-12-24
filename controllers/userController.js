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

const insert = async (req, res, next) => {
  const { name,address } = req.body;
  let companyInsert = companies({name: name,address: address});
  const result = await companyInsert.save();
  return res.status(200).json({message:'Created: '+(result!=null)});
}

module.exports = { index: index, bio: bio };
