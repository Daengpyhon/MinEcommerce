const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryName = await Category.findOne({ name: name }).exec();
    if (categoryName) {
      return res.status(402).send("ມີປະເພດສີນຄ້ານີ້ແລ້ວ !!");
    } else {
      await new Category({ name }).save();
      res.status(200).send("ເພີ່ມໝວດໝູ່ສຳເລັດ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ເພີ່ມໝວດໝູ່ສີນຄ້າລົ້ມເຫລວ !!");
  }
};
exports.allCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນທັງໝົດລົ້ມເຫລວ !!");
  }
};
exports.readCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id }).exec();
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນດ້ວຍໄອດີລົ້ມເຫລວ !!");
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoryName = await Category.findOne({ name: name }).exec();

    if (categoryName) {
      return res.status(402).send("ມີຊື່ໝວດໝູ່ນີ້ຢູ່ແລ້ວ !!");
    } else {
      await Category.findOneAndUpdate({ _id: id }, { name: name }).exec();

      res.status(200).send("ອັບເດັດໝວດໝູ່ສຳເລັດ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບເດັດຂໍ້ມູນລົ້ມເຫລວ!!");
  }
};
exports.removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id }).exec();

    res.status(200).send(`${category.name} ຖືກລົບສຳເລັດແລ້ວ!!`);
  } catch (error) {
    console.log(error);
    res.status(500).send("ລົບຂໍ້ມູນລົ້ມເຫລວ!!");
  }
};
