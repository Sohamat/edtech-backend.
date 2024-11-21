const express = require("express");
const { uploadResource, upload } = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadResource);

module.exports = router;
