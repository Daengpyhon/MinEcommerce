const Blanner = require("../models/Blanner");
const cloudinary = require("cloudinary");

exports.addBlanner = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.avatar, {
      public_id: Date.now(),
      result_type: "auto",
    });

    let blanner = new Blanner({
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    await blanner.save();
    res.status(200).send(blanner);
  } catch (error) {
    console.log(error);
    res.status(404).send("Error can not add a new blanner");
  }
};

// exports.addBlanner = async(req, res)=>{
//   try {
//     console.log(req.body.files)
//     let result  = await Cloudinary.uploader.upload(req.body.image);
//     let blanner = new Blanner({
//       avatar: result.secure_url,
//       cloudinary_id: result.public_id,
//     });

//     await blanner.save();

//     res.status(200).send(blanner)

//   } catch (error) {
//     console.log(error)
//     res.status(404).send("Add new blanner failed")
//   }
// }

exports.getBlanners = async (req, res) => {
  try {
    const result = await Blanner.find({}).exec();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send("couldn't find any blanners!!");
  }
};
exports.delBlanner = async (req, res) => {
  try {
    const { cloudinary_id } = req.params;

    await Blanner.findOneAndDelete({ cloudinary_id: cloudinary_id }).exec();

    await cloudinary.uploader.destroy(cloudinary_id, (result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("couldn't delete this image blanner!!");
  }
};
