const User = require("../models/User");
const Cart = require("../models/Cart");
const UserOrder = require("../models/UserOrder");
const Products = require("../models/Products");

// Save User order product
exports.saveUserOrderProduct = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      phoneNumber,
      address,
      district,
      province,
      paymentSelect,
      paymentImages,
    } = req.body;
    let user = await User.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({ userOrderBy: user._id });

    await new UserOrder({
      products: userCart.products,
      userOrderBy: user._id,
      cartTotal: userCart.cartTotal,
      phoneNumber: phoneNumber,
      address: address,
      district: district,
      province: province,
      paymentSelect: paymentSelect,
      paymentImages: paymentImages,
    }).save();

    //  - stock And + Sold

    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: {
            _id: item.product._id,
          },
          update: {
            $inc: { quantity: -item.count, sold: +item.count },
          },
        },
      };
    });

    let updated = await Products.bulkWrite(bulkOption, {});

    res.status(201).send(updated);
    // res.status(201).send("OK");
  } catch (error) {
    res.status(500).send("ບັນທືກການສັ່ງຊື້ບໍ່ສຳເລັດ");
    console.log(error);
  }
};

// Empty Cart
exports.emptyCart = async (req, res) => {
  try {
    // Check user login
    const user = await User.findOne({ username: req.user.username }).exec();
    let empty = await Cart.findOneAndRemove({ userOrderBy: user._id }).exec();
    res.status(201).send(empty);
  } catch (error) {
    res.status(500).send("ລ້າງຂໍ້ມູນໃນກະຕ່າລົ້ມເຫລວ!!!");
  }
};

// Review Checkout
exports.checkoutReview = async (req, res) => {
  try {
    // Check user login
    const user = await User.findOne({ username: req.user.username }).exec();
    let reviews = await UserOrder.findOne({ userOrderBy: user._id })
      .populate("products.product")
      .populate("userOrderBy")
      .exec();

    res.status(201).send(reviews);
  } catch (error) {
    res.status(500).send("ລ້າງຂໍ້ມູນໃນກະຕ່າລົ້ມເຫລວ!!!");
  }
};

// Get user ordered
exports.getUserOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const userOrderBy = await UserOrder.find({ userOrderBy: user._id })
      .populate("products.product")
      .exec();
    res.status(200).send(userOrderBy);
  } catch (err) {
    console.log(err);
    res.status(500).send("ດືງຂໍ່ມູນການສັ່ງຊື້ລົ້ມເຫລວ!!");
  }
};

// All customers orders (Adminmanage order)
exports.customerOrders = async (req, res) => {
  try {
    const customerOrders = await UserOrder.find({})
      .populate("products.product")
      .populate("userOrderBy", "username")
      .exec();
    res.status(200).send(customerOrders);
  } catch (err) {
    console.log(err);
    res.status(500).send("ດືງຂໍ່ມູນການສັ່ງຊື້ລົ້ມເຫລວ!!");
  }
};
