const mongoose = require("mongoose");
const BlannerSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Banner = mongoose.model("blanners", BlannerSchema);
