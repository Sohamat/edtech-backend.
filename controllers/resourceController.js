const Resource = require("../models/resource");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const uploadResource = async (req, res) => {
  const { name, topic, description } = req.body;
  const fileUrl = req.file.path;

  const resource = new Resource({ name, fileUrl, topic, uploadedBy: req.user.id, description });
  await resource.save();
  res.json(resource);
};

module.exports = { uploadResource, upload };
