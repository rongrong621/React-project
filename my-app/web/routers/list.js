const express = require('express');
const router = express.Router();
const Person = require('../model/Person');





Person.create(
    {
        checked: 'false',
        id: 1,
        productName: "手机",
        number:10,//数量
        company:'个',//单位
        time: '2016-06-01 10:00:06',
        
    }, 
    {
       checked: 'false',
        id: 1,
        productName: "电脑",
        number: 1, //数量
        company: '台', //单位
        time: '2016-06-01 10:00:06',
    }, 
    {
       checked: 'false',
        id: 1,
        productName: "衣服",
        number: 10, //数量
        company: '件', //单位
        time: '2016-06-01 10:00:06',
    }
);
router.get('/',(req,res)=>{
   
    let {act}= req.query;
        
    switch(act){
         case "get":
             console.log(123)
             Person.find({}, (error, data) => {
                 res.json(JSON.stringify(data))
                 console.log(data)
             })
             break;
    }
})




module.exports = router;
