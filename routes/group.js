const express = require("express");
const { createGroup, joinGroup } = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createGroup);
router.post("/join", authMiddleware, joinGroup);

module.exports = router;
