const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Products = require("../models/Products");
const Cart = require("../models/Cart");

exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.readUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.updateUsers = async (req, res) => {
  try {
    // console.log(req.body.values.password)

    const { id, password } = req.body.values;
   // console.log(password);

    // GEN SALT
    const salt = await bcrypt.genSalt(10);

    // ENCRYPT
    let enPassword = await bcrypt.hash(password, salt);

    //console.log(enPassword);

    await User.findOneAndUpdate({ _id: id }, { password: enPassword });
    res.send("ອັບເດັດລະຫັດຜ່ານສຳເລັດ");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.removeUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(`${user.username} ຖືກລົບສຳເລັດ`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.changeStatus = async (req, res) => {
  try {
   // console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
exports.changeRole = async (req, res) => {
  try {
   // console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    // Check user is authorized to access this acount
    let user = await User.findOne({ username: req.user.username }).exec();

    let products = [];

    let oldCart = await Cart.findOne({ userOrderBy: user._id }).exec();

    if (oldCart) {
      oldCart.remove();
      console.log("Removed old cart");
    }

    // Loops through products
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object);
    }

    // Summation products cart
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      userOrderBy: user._id,
    }).save();

   // console.log(newCart);
    res.status(200).send(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("ບັນທືກການສັ່ງຊື້ລົ້ມເຫລວ!!");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    // Check user login
    const user = await User.findOne({ username: req.user.username }).exec();
    let cart = await Cart.findOne({ userOrderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();
    const { products, cartTotal } = cart;

    res.status(200).json({ products, cartTotal });
  } catch (error) {
    res.status(500).send("ດືງຂໍ້ມູນການສັ່ງສີນຄ້າລົ້ມເຫລວ!!!");
  }
};

exports.addToLike = async(req, res)=>{
  try {

    const {productId} = req.body
    let user = await User.findOneAndUpdate({username: req.user.username},
      {$addToSet:{like:productId}}).exec();
    res.send(user)
    
  } catch (err) {
    console.log(err)
    res.status(500).send("ເພີ່ມສີນຄ້າທີ່ສົນໃຈລົ້ມເຫລ້ວ!!")
  }
}
exports.getLike = async(req, res)=>{
  try {
   let user = await User.findOne({username:req.user.username})
   .select('like').populate('like').exec();
   res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("ດືງຂໍ້ມູນທີ່ສົນໃຈບໍສຳເລັດ!!")
  }
}
exports.removeLike = async(req, res)=>{
  try {
     const {productId} = req.params;
     let user = await User.findOneAndUpdate({username:req.user.username}, {$pull:{like:productId}}).exec();
     res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("ລົບຂໍ້ມູນທີ່ສົນໃຈບໍສຳເລັດ!!")
  }
}

// Change Profile
exports.changeProfile = async(req, res)=>{
  try {

    let {image} = req.body;
  // console.log('image',image)
   let user = await User.findOne({username:req.user.username}).exec();
    await User.findOneAndUpdate({username:user.username}, {images:image})
    res.status(200).send("ປ່ຽນຮູບໂປຟາຍສຳເລັດ")
  } catch (err) {
    console.log(err)
    res.status(500).send("ປ່ຽນຮູບໂປຟາຍລົ້ມເຫລວ!!")
  }
}

exports.getProfile = async (req, res) =>{
  try {
    let user = await User.findOne({username:req.user.username}).select("-password").exec();
    res.status(200).send(user);
  } catch (error) {
    console.log(error)
    res.status(500).send("ມີບາງຢ່າງຜິດພາດ ດືງຂໍ້ມູນໂປຣຟາຍບໍ່ສຳເລັດ!!")
  }
}

exports.userProfile = async (req, res) =>{
  try {
    let user = await User.findOne({username:req.user.username}).select("-password").exec();
    res.status(200).send(user);
  } catch (error) {
    console.log(error)
    res.status(500).send("ມີບາງຢ່າງຜິດພາດ ດືງຂໍ້ມູນໂປຣຟາຍບໍ່ສຳເລັດ!!")
  }
}