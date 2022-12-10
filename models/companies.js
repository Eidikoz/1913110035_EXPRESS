const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = new Schema({
    name: String,
    address: {
        province: String
    }
});

const companies = mongoose.model("companies",companiesSchema);
module.exports = companies;