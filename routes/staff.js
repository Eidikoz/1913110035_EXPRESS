const express = require("express");
const router = express.Router();
const { staff, insert, show, destroy, update } = require("../controllers/staffController");

router.get("/", staff);
router.get("/:id",show);
router.put("/:id",update)
router.delete("/:id",destroy)
router.post("/", insert);

module.exports = router;