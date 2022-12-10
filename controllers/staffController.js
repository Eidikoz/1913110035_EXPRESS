const staffs = require("../models/staff");

const staff = async (req, res, next) => {
  const staffResult = await staffs.find().sort({_id:-1});

  return res.status(200).json({ data: staffResult });
};

const insert = async (req, res, next) => {
    const { name,salary,job } = req.body;
    let staffInsert = staffs({name: name,salary: salary,job: job});
    const result = await staffInsert.save();
    return res.status(200).json({message:'Created: '+(result!=null)});
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
