const shop = async (req, res, next) => {

    const companyResult = await companies.find().sort({_id:-1});
    return res.status(200).json({ data: companyResult });
};
  
  module.exports = { shop:shop };  