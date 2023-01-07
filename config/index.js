require('dotenv').config();

module.exports ={
  MONGODBURI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN
}