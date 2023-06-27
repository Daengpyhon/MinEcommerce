const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  }
},{timestamps:true});

module.exports = Category = mongoose.model('categories', categorySchema);