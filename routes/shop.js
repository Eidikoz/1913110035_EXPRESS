const express = require("express");
const shopController = require("../controllers/shopController");
const router = express.Router();
const { shop , menu , show , addShop , destroy} = require("../controllers/shopController");

router.get("/", shop);
router.get("/menu", menu);
router.get("/:id",show);
router.post('/', addShop);
router.delete('/:id', destroy);
module.exports = router;