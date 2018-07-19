/**
 * Created by Moudi on 2017/3/12.
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    orderNumber: Number, //订单编号
    productName: String, //商品名称
    time: String, 
    total: Number,//总价
    discount: Number, //优惠
    money: Number, //交易金额
    type: String, //类型
    number1: Number, //数量
    status: String, //状态
    onOff: Boolean,
});