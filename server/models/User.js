const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
   
    enabled: {
      type: Boolean,
      default: true,
    },
    like: [
      {
        type: ObjectId,
        ref: "products",
      },
    ],
    images : {
      type: Array
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", userSchema);
