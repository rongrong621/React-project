/**
 * Created by Moudi on 2017/3/12.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    MessNumber: Number, //留言编号
    userName: String, //用户名
    time: String, //留言时间
    mess: String, //留言内容
    status: String, //状态
    onOff: Boolean,
});