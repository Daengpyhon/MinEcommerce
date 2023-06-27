const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
     title : {
      type: String,
      required: true,
      text: true,
     },
     description : {
      type: String
     },
     category : {
      type : ObjectId,
      ref : "categories"
     },
    
     price : {
      type: Number
     },
     sold : {
      type: Number,
      default : 0
     }
     ,
     quantity :{
      type: Number
     }
     ,
     images : {
      type : Array
     }

  },{timestamps:true}
)

module.exports = Product = mongoose.model("products", ProductSchema)