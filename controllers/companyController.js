const companies = require("../models/companies");

const company = async (req, res, next) => {
  const companyResult = await companies.find().sort({_id:-1});

  return res.status(200).json({ data: companyResult });
};
const insert = async (req, res, next) => {
  const { name,address } = req.body;
  let companyInsert = companies({name: name,address: address});
  const result = await companyInsert.save();
  return res.status(200).json({message:'Created: '+(result!=null)});
};

const show = async (req,res,next) => {
  try{
      const {id} = req.params;
      const companyResult = await companies.findOne({_id: id});
      if(!companyResult){
          throw new Error('Company not found')
      }
      return res.status(200).json({ data: companyResult });
  }catch(e){
      res.status(404).end("Error: "+e.message)
  }

};

const destroy = async (req,res,next) => {
  try{
  const {id} = req.params
  const companyResult = await companies.deleteOne({_id:id});

  return res.status(200).json({message:"Deleted",data: companyResult})
  }catch(e){
    res.status(404).end("Error: "+e.message)
  }
};

const update = async (req,res,next) => {
  try{
      const {id} = req.params;
      const {name,address} = req.body;
      const companyResult = await companies.findByIdAndUpdate(id,{
          name: name,
          address: address
      });
      if(!companyResult){
          throw new Error('Staff not found')
      }
      const result = await companyResult.save();

      return res.status(200).json({ message:"Updated: "+(result!=null) });
  }catch(e){
      res.status(404).end("Error: "+e.message)
  }
};
module.exports = { company: company, insert: insert, show: show, destroy: destroy, update: update };
