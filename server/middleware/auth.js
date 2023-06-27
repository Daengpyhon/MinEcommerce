const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).send("ທ່ານບໍ່ມີໂທເຄນ, ການອະນຸຍາດໄດ້ຖືກປະຕິເສດ !!");
    }

    const decoded = jwt.verify(token, 'jwtScret');

    console.log("Middleware : ", decoded)

    req.user = decoded.user;
   

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("ບໍ່ມີໂທເຄັນ ການອານຸຍາດຖືກປະຕິເສດ!!");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const {username} = req.user;
    const adminUser = await User.findOne({username}).exec();
    if (adminUser.role !== "admin"){
         return res.status(403).send("ປະຕິເສດການເຂົ້າເຖີງແອັດມີນ !!")
    }else{
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("ປະຕິເສດການເຂົ້າເຖີງແອັດມີນ !!");
  }
};
