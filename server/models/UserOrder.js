const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserOrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: "products",
      },
      count: Number,
      price: Number,
    },
  ],
  cartTotal: Number,
  orderStatus : {
    type : String,
    default : "ລໍຖ້າການອານຸມັດ"
  },
  phoneNumber : {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  paymentSelect: {
    type: String,
    required: true,
  },

  paymentImages: {
    type: [],
  },
  userOrderBy: {
    type: ObjectId,
    ref: "users",
  }
}, { timestamps: true });

module.exports = UserOrder = mongoose.model("user_orders", UserOrderSchema);
