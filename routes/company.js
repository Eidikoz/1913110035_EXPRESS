const express = require("express");
const router = express.Router();
const { company, insert, show, destroy, update } = require("../controllers/companyController");

router.get("/", company);
router.get("/:id",show);
router.put("/:id",update)
router.delete("/:id",destroy)
router.post("/", insert);

module.exports = router;
