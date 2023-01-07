const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const shops = require("../models/shop");
const menus = require("../models/menu");
const config = require('../config');
const staffs = require("../models/staff");

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

const staff = async (req, res, next) => {
  const staffResult = await staffs.find().sort({_id:-1});

  return res.status(200).json({ data: staffResult });
};

const insert = async (req, res, next) => {
    const { name, salary, photo } = req.body;
  let staffinsert = staff({
    name: name,
    salary: salary,
    photo: await saveImageToDisk(photo),
  });
  const result = await staffinsert.save();
  return res
    .status(200)
    .json({ message: `Insert Successful: ${(result != null)}` });
};

const show = async (req,res,next) => {
    try{
        const {id} = req.params;
        const staffResult = await staffs.findOne({_id: id});
        if(!staffResult){
            throw new Error('Staff not found')
        }
        return res.status(200).json({ data: staffResult });
    }catch(e){
        res.status(404).end("Error: "+e.message)
    }

};

const destroy = async (req,res,next) => {
    const {id} = req.params
    const staffResult = await staffs.deleteOne({_id:id});

    return res.status(200).json({message:"Deleted",data: staffResult})
};

const update = async (req,res,next) => {
    try{
        const {id} = req.params;
        const {name,salary,job} = req.body;
        console.log(req.body);
        const staffResult = await staffs.findByIdAndUpdate(id,{
            name: name,
            salary: salary,
            job: job
        });
        if(!staffResult){
            throw new Error('Staff not found')
        }
        const result = await staffResult.save();

        return res.status(200).json({ message:"Updated: "+(result!=null) });
    }catch(e){
        res.status(404).end("Error: "+e.message)
    }
};

module.exports = { staff: staff, insert: insert, show: show, destroy: destroy, update: update};
