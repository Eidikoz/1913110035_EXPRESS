const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = new Schema({
    name: String,
    address: {
        province: String
    }
},{collection:"companies"});

const companies = mongoose.model("companies",companiesSchema);
module.exports = companies;