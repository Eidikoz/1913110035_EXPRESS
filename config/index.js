require('dotenv').config();

module.exports ={
  MONGODBURL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN
}