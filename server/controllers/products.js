
const Product = require("../models/Products");

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.body);
    await new Product(req.body).save();
    res.status(200).send("ບັນທືກສຳເລັດແລ້ວ");
  } catch (error) {
    console.log(error);
    res.status(500).send("ການບັນທືກຂໍ້ມູນລົ້ມເຫລວ");
  }
};

exports.listProducts = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    // console.log("Count : ",count)
    const products = await Product.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]])
      .exec();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນລົ້ມເຫລວ");
  }
};

// All product pagination

exports.allProductPage = (req, res)=>{
  try {
     res.status(200).send("OK")
  } catch (error) {
    console.log("error all product")
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id }).exec();
    res.status(200).send("ລົບສຳເລັດແລ້ວ");
  } catch (error) {
    console.log(error);
    res.status(500).send("ລົບລົ້ມເຫລວ!!");
  }
};

exports.readProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id })
      .populate("category")
      .exec();
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("ດື່ງຂໍ້ມູນລົ້ມເຫລວ!!");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send("ອັບເດັດສຳເລັດ");
  } catch (error) {
    console.log(error);
    res.status(500).send("ອັບເດັດລົ້ມເຫລວ!!");
  }
};

//! BEST SELLER AND NEW PRODCUCTS

exports.listProductsBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);

    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນລົ້ມເຫລວ");
  }
};

// ! GET PAGINATION

exports.getProductsAll = async (req, res) => {
  try {

    const productAll = await Product.find({})
      .populate("category")
      .sort([["createdAt", "desc"]]);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};

    results.totalProducts = productAll.length;
    results.pageCount = Math.ceil(productAll.length / limit);

    if (lastIndex < productAll.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.pre = {
        page: page - 1,
      };
    }
    results.result = productAll.slice(startIndex, lastIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນລົ້ມເຫລວ");
  }
};
exports.firstPage = async (req, res) => {
  try {

    const productAll = await Product.find({})
      .populate("category")
      .sort([["createdAt", "desc"]]);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};

    results.totalProducts = productAll.length;
    results.pageCount = Math.ceil(productAll.length / limit);

    if (lastIndex < productAll.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.pre = {
        page: page - 1,
      };
    }
    results.result = productAll.slice(startIndex, lastIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("ການດືງຂໍ້ມູນລົ້ມເຫລວ");
  }
};

//! Find Max Product Price

exports.maxPrice = async (req, res) => {
  try {
    const product = await Product.find()
      .sort({ price: -1 })
      .limit(1)
      .select("price");
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("ຫາຄ່າສູງສຸດລົ້ມເຫຼວ!!!");
  }
};

//! SEARCH AND FILTERS PRODUCT
// 1.1 Filter with title
const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate(
    "category",
    "_id name"
  );
  res.status(200).send(products);
};

// 1.2 Filter with price
const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  }).populate("category", "_id name");
  res.status(200).send(products);
};

//1.3 Filter with categories
const handleCategory = async (req, res, category) => {
  let products = await Product.find({ category }).populate(
    "category",
    "_id name"
  );
  res.status(200).send(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  if (query) {
    console.log("Search query : ", query);
    await handleQuery(req, res, query);
  }

  // Find price start array [0, 20000]
  if (price !== undefined) {
    console.log("Search Price : ", price);
    await handlePrice(req, res, price);
  }

  // Find categories
  if (category) {
    console.log("Search category : ", category);
    await handleCategory(req, res, category);
  }
};
