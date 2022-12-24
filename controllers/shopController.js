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
    const menu = await menus.find().populate('shop');
    return res.status(200).json({data:menu});
};
const show = async (req,res,next) => {
    try{
        const {id} = req.params;
        const result = await shops.findOne({_id: id}).populate('menu');;
        if(!result){
            throw new Error('Shop not found')
        }
        return res.status(200).json({ data: result });
    }catch(e){
        res.status(404).end("Error: "+e.message)
    }

};

module.exports = { shop:index, menu: menu ,show: show};