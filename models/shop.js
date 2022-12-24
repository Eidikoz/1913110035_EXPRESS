const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: {type: String, required:true, trim:true},
    salary:{type: Number, default:'nopic.png'},
    location:{
        lat:Number,
        lgn:Number,

    },
    createdAT:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
},
{
    timestamps:true,
    collection:"shops"
});

const shop = mongoose.model("shops",shopSchema,"shops");
module.exports = shop;