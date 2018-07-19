const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  number: Number,//编号
  loginName: String,//登录名
  mobile: Number, //手机
  email: String, //邮箱
  role: String, //角色
  time: String,//加入时间
  status: String, //状态
  onOff: Boolean,
  page: Number,
  checked: Boolean
});