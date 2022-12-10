const mongoose = require('mongoos');
const Schemema = mongoose.Schemema;

const companiesSchema = new Schemema({
    name: String,
    address: {
        province: String
    }
});