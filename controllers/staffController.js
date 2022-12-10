const staffs = require("../models/staff");

const staff = async (req, res, next) => {
  const staffResult = await staffs.find().sort({_id:-1});

  return res.status(200).json({ data: staffResult });
};

const insert = async (req, res, next) => {
    const { name,salary,job } = req.body;
    let staffinsert = staffs({name: name,salary: salary,job: job});
    const result = await staffinsert.save();
    return res.status(200).json({message:'Done: '+(result!=null)});
};

const show = async (req,res,next) => {
    try{
        const {id} = req.params;
        const staffResult = await staffs.findOne({_id: id});
        if(!staffResult){
            throw new Error('No staff found')
        }
        return res.status(200).json({ data: staffResult });
    }catch(error){
        res.status(404).end("Error: "+error.message)
    }

}

const destroy = async (req,res,next) => {
    const { id } = req.params
    const staffResult = await staffs.deleteOne({_id:id});

    return res.status(200).json({message:"Done: ",data: staffResult})
}

module.exports = { staff: staff, insert: insert, show: show, destroy: destroy};
