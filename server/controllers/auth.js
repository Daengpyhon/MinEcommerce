const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Check User
    const { firstName, lastName, username, email, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).send("ຊື່ຜູ້ໃຊ້ນີ້ມີຜູ້ໃຊ້ງານແລ້ວ!!");
    }
    const salt = await bcrypt.genSalt(10);

    user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Endcrypt
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("ສະໝັກສະມາຊີກສຳເລັດ ");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error" + err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOneAndUpdate({ username }, { new: true });

    if (user && user.enabled) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ !!");
      }

      // Payload
      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      // Genterate Token
      jwt.sign(payload, "jwtScret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("ບໍ່ພົບຜູ້ໃຊ້ນີ້ !!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error" + err.message);
  }
};

exports.currentUser = async (req,res)=>{
   try {
   // console.log('Controller ',req.user)
    const user = await User.findOne({username:req.user.username})
    .select('-password')
    .exec();
    res.send(user);
   // console.log('Login by ',user)
   
   } catch (err) {
    console.log(err)
    res.status(500).send("Server Error")
   }
}
