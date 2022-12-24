const express = require("express");
const router = express.Router();
const { shop , menu , show } = require("../controllers/shopController");

router.get("/", shop);
router.get("/menu", menu);
router.get("/:id",show)

module.exports = router;