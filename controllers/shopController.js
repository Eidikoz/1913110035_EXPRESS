const shops = require("../models/shop");
const menus = require("../models/menu");

const index = async (req, res, next) => {
    const shop = await shops.find().sort({_id:-1});
    const shopWithPhotoDomain = shop.map ((shop,index) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: 'http://localhost:3000/images/'+shop.photo,
            location: shop.location
        };
    });
    return res.status(200).json({data:shopWithPhotoDomain});
};
const menu = async (req, res, next) => {
    const menu = await menus.find().sort({_id:-1});
    return res.status(200).json({data:menu});
};

module.exports = { shop:index, menu: menu};  