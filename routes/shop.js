const express = require("express");
const router = express.Router();
const { shop } = require("../controllers/shopController");

router.get("/", shop);

module.exports = router;