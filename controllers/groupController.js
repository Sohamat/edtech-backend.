const Group = require("../models/group");
const User = require("../models/User");

const createGroup = async (req, res) => {
  const { name, description, topics } = req.body;
  const group = new Group({ name, description, topics });

  await group.save();
  res.json(group);
};

const joinGroup = async (req, res) => {
  const { groupId } = req.body;
  const user = await User.findById(req.user.id);

  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ msg: "Group not found" });

  if (!group.members.includes(user.id)) {
    group.members.push(user.id);
    await group.save();
  }

  res.json(group);
};

module.exports = { createGroup, joinGroup };
