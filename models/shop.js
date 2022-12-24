const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: {type: String, required:true, trim:true},
    salary:{type: Number, default:'nopic.png'},
    photo:{type:String},
    location:{
        lat:Number,
        lgn:Number,

    },
    // createdAT:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
},{
    toJSON: { virtuals: true},
    timestamps: true,
    collection:"shops"
});

shopSchema.virtual('menu',{
    ref:'menus',
    localField: '_id',
    foreignField: 'shop'
})

const shop = mongoose.model("shops",shopSchema,"shops");
module.exports = shop;