const express = require("express");
const router = express.Router();
//! CONTROLLERS
const {
  createProduct,
  listProducts,
  deleteProduct,
  readProduct,
  updateProduct,
  listProductsBy,
  searchFilters,
  maxPrice,
  getProductsAll,
  firstPage
} = require("../controllers/products");
//! MIDDLEWARE CHECK
const { auth, adminCheck } = require("../middleware/auth");
router.post("/product", auth, adminCheck, createProduct);

router.get("/products/:count", auth, adminCheck, listProducts);
router.get("/all-product-page", auth, adminCheck, getProductsAll );
//router.get("/pagination?page=1&limit=5", getPagination)
router.get("/get-all-products", firstPage)

router.delete("/product/:id", auth, adminCheck, deleteProduct);

//! READ AND UPDATE PRODUCT BY ADMIN
router.get("/product/:id", auth, adminCheck, readProduct);
router.put("/product/:id", auth, adminCheck, updateProduct);
//!READ PRODUCT BY ID USER 
router.get("/productid/:id", readProduct);
router.get("/productshop/:count", listProducts);

//! Find Max value
router.get("/max-price", maxPrice);

//! READ PRODUCT BY
router.post("/productsby", listProductsBy);




//!SEARCH AND FILTERS PRODUCT

router.post('/search/filters', searchFilters);

module.exports = router;
