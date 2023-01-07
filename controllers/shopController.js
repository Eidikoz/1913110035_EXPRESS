const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const shops = require("../models/shop");
const menus = require("../models/menu");
const config = require('../config');

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}

const index = async (req, res, next) => {
    const shop = await shops.find().sort({_id:-1});
    const shopWithPhotoDomain = shop.map ((shop,index) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: `${config.DOMAIN}:${config.PORT}/images/${shop.photo}`,
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
const addShop = async (req,res,next) => {
    const {name, location, photo} = req.body;
    let shop = new shop({
        name,
        location,
        photo: photo && (await saveImageToDisk(photo))
    })
    await shop.save()
    res.status(201).json({message:'show added successfully'})
}
const destroy = async (req,res,next) => {
    try {
        const { id } = req.params
        const shop = await Shop.deleteOne({ _id: id })
    if (shop.deletedCount === 0) throw new Error('shop not found')
        res.status(200).json({ message: 'shop deleted successfully' })
    } catch (err) {
        res.status(404).json({ message: 'error : ' + err.message })
    }
}

module.exports = { shop:index, menu: menu ,show: show, addShop: addShop, destroy: destroy};