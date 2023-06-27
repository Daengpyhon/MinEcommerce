
const cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

exports.createImages = async(req, res)=>{
  try {
   // console.log(req.body.files)
    const result = await cloudinary.uploader.upload(req.body.image,{
      public_id : Date.now(),
      result_type: "auto",
    })
    res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບໂຫລດຮູບພາບລົ້ມເຫລວ!!")
  }
}

// Change Profile
exports.changeProfile= async(req, res)=>{
  try {
   // console.log(req.body.files)
    const result = await cloudinary.uploader.upload(req.body.image,{
      public_id : Date.now(),
      result_type: "auto",
    })
    res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບໂຫລດຮູບພາບລົ້ມເຫລວ!!")
  }
}

exports.removeImages = async(req, res)=>{
  try {
    const image_id = req.body.public_id
    //console.log('Public id : ',image_id)
    cloudinary.uploader.destroy(image_id, (result)=>{
      res.status(200).send(result)
    })
   
  } catch (error) {
    console.log(error);
    res.status(500).send("ລົບຮູບພາບລົ້ມເຫລວ!!")
  }
}

// Image Checkout

exports.paymentImages = async(req, res)=>{
  try {
   // console.log("Upload Success")
    const result = await cloudinary.uploader.upload(req.body.image,{
      public_id : Date.now(),
      result_type: "auto",
    })
    res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບໂຫລດຮູບພາບລົ້ມເຫລວ!!")
  }
}