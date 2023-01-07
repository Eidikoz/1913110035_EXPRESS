require('dotenv').config();

module.exports ={
  MONGODBURL: process.env.MONGODBURL,
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN
}