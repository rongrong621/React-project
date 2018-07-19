/**
 * Created by Moudi on 2017/3/12.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  number: Number,//编号
  productName: String,//商品名称
  fenlei: String, //商品分类
  Stock: Number, //库存
  Price: Number,//价格
  time: String,//加入时间
  status: String, //状态
  onOff: Boolean,
  page: Number,
  checked: Boolean
});