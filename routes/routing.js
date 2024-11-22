const express = require ("express");
const { getMessagesByRoom, createRoom, getRoomNames } = require("../controllers/chatController");
const router = express.Router();
router.route("/getAllRooms").get(getRoomNames);
router.route("/:roomName").get(getMessagesByRoom);
router.route("/createRoom").post(createRoom);

module.exports = router;