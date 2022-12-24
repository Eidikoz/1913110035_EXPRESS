const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffsSchema = new Schema({
    name: {type: String,require: true,trim: true},
    salary: { type: Number },
    job: {type: String,require: true,trim: true},
    created: { type: Date, default: Date.now},
});

const staffs = mongoose.model("staffs",staffsSchema,"staffs");
module.exports = staffs;