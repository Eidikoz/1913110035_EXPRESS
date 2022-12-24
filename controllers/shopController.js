const shops = require("../models/shop");

const shop = async (req, res, next) => {

    const shopResult = await shops.find().sort({_id:-1});
    return res.status(200).json({ data: shopResult });
};
  
module.exports = { shop:shop };  