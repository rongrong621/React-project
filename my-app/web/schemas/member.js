/**
 * Created by Moudi on 2017/3/12.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    userName: String, //用户名
    sex: String, //性别
    mobile: Number, //手机
    email: String, //邮箱
    address: String, //地址
    grade: String, //等级
    status: String, //状态
    onOff: Boolean,
    page: Number,
    checked: Boolean,
   time: String, 
});