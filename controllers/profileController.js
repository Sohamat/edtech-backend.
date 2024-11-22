const User = require("../models/User");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is populated via middleware
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, profilePicture, topicsOfInterest, syllabus, coursework } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(profilePicture && { profilePicture }),
      ...(topicsOfInterest && { topicsOfInterest }),
      ...(syllabus && { syllabus }),
      ...(coursework && { coursework }),
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProfile,
  updateProfile,
};