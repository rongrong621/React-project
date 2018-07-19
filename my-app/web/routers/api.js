/**
 * Created by Moudi on 2017/2/23.
 */
"use strict";
let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Commodity = require('../models/commodity');//产品列表
let Order=require('../models/order');//订单用
let Member = require('../models/member'); //会员用
let Message = require('../models/message'); //会员用
let Admini = require('../models/admini'); //会员用
let multiparty = require('multiparty');
let fs = require('fs');
let resData;

router.use(function (req, res, next) {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

router.post('/user/login', (req, res, next) => {
  console.log('登录')
  let username = req.body.username;
  let password = req.body.password;
  console.log(username)
  if (username == '' || password == '') {
    resData.code = -1;
    resData.msg = '用户名或密码不能为空';
    res.json(resData);
    return;
  }
  User.findOne({
    username: username,
    password: password
  }).then((userInfo) => {
    if (!userInfo) {
      resData.code = -3;
      resData.msg = '用户不存在或密码错误'
      res.json(resData);
      return;
    }
    resData.msg = '登录成功';
    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    };
    res.json(resData);
  })
});

router.post('/user/register', (req, res, next) => {
  console.log('注册')
  let username = req.body.username;
  let password = req.body.password;

  if (username == '') {
    resData.code = -1;
    resData.msg = '用户名不能为空';
    res.json(resData);
    return;
  }
  if (password == '') {
    resData.code = -2;
    resData.msg = '密码不能为空';
    res.json(resData);
    return;
  }
  // let user = new User({
  //   username: username,
  //   password: password
  // });
// user.save().then(function (newUserInfo) {

  console.log(username,'这个就是前端传的name')
  User.findOne({
    username: username
  }).then(function(newUserInfo){
    console.log(newUserInfo+'OK');
    if(!newUserInfo){
      let user = new User({
        username: username,
        password: password
      });
      user.save().then(()=>{
        resData.code = 0;
        resData.msg = '注册成功！';
        console.log(resData);
        res.json(resData);
      });
    }else{
        resData.code = 1;
        resData.msg = '用户名已占用!';
        res.json(resData);
    }
  });
});

router.post('/upload', (req, res, next) => {
  //生成对象，配置上传目标路径
  let form = new multiparty.Form({
    uploadDir: './public/files/',
    encoding: 'utf-8'
  });
  form.parse(req, function (err, fields, files) {
    fs.rename(files.file[0].path, './public/files/' + files.file[0].originalFilename, function (err) {
      if (err) {
       console.log('重命名失败');
      } else {
        resData.code = 0;
        resData.msg = '上传成功！';
        res.json(resData);
      }
    })
  });
});

// 获取密码
router.post('/user/findpassword', (req, res, next) => {
  let password = req.body.password;
  User
    .find({ password: password })
    .sort('-time')
    .exec((err, data) => {
      let arr = [];
      for (let o of data) {
        let obj = {
          id: o._id,
          username: o.username,
          password: o.password,
         
        };

        arr.push(obj);

      }
      res.json(arr);
    });

})
//修改账号密码
router.post('/user/update', (req, res, next) => {
  console.log(req.body);

  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
 
  let obj = {
    username,
    password,
  }
  console.log(obj)
  User.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
     resData.username = data.username;
      resData.password = data.password;
     res.json(resData);
    }
  });
});



//修改数据
router.post('/commodity/update', (req, res, next) => {
  console.log(req.body);
  
  let id = req.body.id;
  let productName = req.body.productName;
  let Price = Number(req.body.Price);
  let Stock =Number(req.body.Stock); //库存
  let fenlei = req.body.fenlei;
  let number = +new Date
  let time = req.body.time
  let obj = {
    id,
    productName,
    number,
    Price,
    Stock,
    fenlei
  }
  console.log(obj)
  Commodity.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.id = data._id;
      resData.productName = data.productName;
      resData.number = data.number;
      resData.Price = data.Price;
      resData.Stock = data.Stock;
      resData.onOff = data.onOff;
       res.json(resData);
    }
  });
});

//commodity
router.get('/commodity', (req, res, next) => {
  let act = req.query.act;
  let id,content;
  const PAGE_SIZE = 6;

  switch(act) {
    case 'add':
      let productName = req.query.productName;//商品名称
      let fenlei = req.query.fenlei; //商品名称
      let onOff = req.query.onOff; //是否启用
      let checked=false;//是否选中
      let Price = req.query.Price;//价格
      let time=+new Date;//加入时间
      let number=+new Date;//编号
      let Stock = req.query.Stock;//库存
      let status=req.query.status;//状态

      if (!productName) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        productName = productName.replace('\n', '');
        let new_Commodity = Commodity({
          productName,
          onOff,
          checked,
          Price,
          time,
          number,
          Stock,
          fenlei,
          status
        
        });
        new_Commodity.save((err, data) => {
         console.log('这是我的err：' + err);
         if(err){
           resData.code=-1;
           resData.msg='提交失败!';
           res.json(resData);
         }else{
           resData.code=0;
           resData.msg='提交成功了!';
           resData.id = data._id;
           resData.productName = data.productName;
           resData.fenlei = data.fenlei;
           resData.number = data.number;
           resData.onOff = data.onOff;
           resData.checked = data.checked;
           resData.Price = data.Price;
           resData.time = data.time;
           resData.Stock = data.Stock;
           resData.status = data.status;
           res.json(resData);
         }
        });
      }
      break;
    case 'get_page_count':
      Commodity.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;


      // 查询用的页码
    case 'get_find_count':
     let name1 = req.query.name;
     let hehe1 = req.query.fenlei;
      Commodity.count({[hehe1]:name1}, (err, n) => {
        console.log(n)
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
       Commodity.find({})
        .sort('-time')
        .skip(PAGE_SIZE * (page-1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              productName: o.productName,
              Stock: o.Stock,
              number: o.number,
              onOff: o.onOff,
              checked: o.checked,
              Price: o.Price,
              time: o.time,
              fenlei:o.fenlei,
              status:o.status
            };
            arr.push(obj);
          }
          res.json(arr);
        });
      }
      break;
    //删除
    case 'del':
      id = req.query.id;
      Commodity.remove({ _id: id}, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
      //批量删除
    case 'delAll':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Commodity.remove({ _id: l[i] }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';
            
          } else {
            resData.code = -1;
            resData.msg = '删除失败';
            
          }
        });
      }
      res.json(resData);
      break;
      // 查询商品名称
      case 'findName':
      let name=req.query.name;
      let hehe = req.query.fenlei;
      let num = req.query.num;
      
      Commodity.find({[hehe]: name})
      .sort('-time')
      .skip(PAGE_SIZE * (num - 1))
      .limit(PAGE_SIZE)
      .exec((err,data)=>{
        console.log(data);
        let arr=[];
        for(let o of data){
          let obj={
            id:o._id,
            fenlei:o.fenlei,
            productName: o.productName,
            number:o.number,
            Stock: o.Stock,
            checked: o.checked,
            Price: o.Price,
            time: o.time,
            status:o.status
          };
          arr.push(obj);
        }
        res.json(arr);
      })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

// 订单
router.get('/order', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 6;

  switch (act) {
    case 'add':
      let orderNumber = req.query.orderNumber;//订单编号
      let productName = req.query.productName; //商品名称
      let total = req.query.total; //总价
      let discount = req.query.discount; //优惠
      let money = req.query.money; //交易金额
      let type=req.query.type;//类型
      let status = req.query.status; //状态
      let number1 = req.query.number1;
      if (!productName) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        productName = productName.replace('\n', '');
        let new_Order = Order({
          time,
          orderNumber,
          productName,
          total,
          discount,
          money,
          type,
          status,
          number1
        });
        new_Order.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败!';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功了!';
            resData.time = data.time;
            resData.id = data._id;
            resData.productName = data.productName;
            resData.orderNumber = data.orderNumber;
            resData.total = data.total;
            resData.discount = data.discount;
            resData.money = data.money;
            resData.type = data.type;
            resData.status = data.status;
            resData.number1 = data.number1;
            res.json(resData);
          }
        });
      }
      break;
    case 'get_page_count':
      Order.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
      // 查询用的页码
    case 'get_find_count':
      let name1 = req.query.name;
      let hehe1 = req.query.type;
      Order.count({
        [hehe1]: name1
      }, (err, n) => {
        console.log(n)
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Order.find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                time: o.time,
                id: o._id,
                productName: o.productName,
                orderNumber: o.orderNumber,
                total: o.total,
                discount: o.discount,
                money: o.money,
                type: o.type,
                status: o.status,
                number1:o.number1
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
      //删除
    case 'del':
      id = req.query.id;
      Order.remove({
        _id: id
      }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
      //批量删除
    case 'delAll':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Order.remove({
          _id: l[i]
        }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';

          } else {
            resData.code = -1;
            resData.msg = '删除失败';

          }
        });
      }
      res.json(resData);
      break;
      // 查询订单的
    case 'findName':
      let name = req.query.name;
      let hehe = req.query.type;
      let num = req.query.num;

      Order.find({
          [hehe]: name
        })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              time: o.time,
              id: o._id,
              orderNumber: o.orderNumber,
              productName: o.productName,
              total: o.total,
              discount: o.discount,
              money: o.money,
              type: o.type,
              number: o.number,
              status: o.status,
              number1:o.number1

            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;


    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

// 会员
router.get('/member', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 6;

  switch (act) {
    case 'add':
      let userName = req.query.userName; //用户名
      let sex = req.query.sex; //性别
      let mobile = req.query.mobile; //手机
      let email = req.query.email; //邮箱
      let address = req.query.address; //地址
      let grade = req.query.grade; //等级
      let status = req.query.status; //状态
      if (!userName) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        userName = userName.replace('\n', '');
        let new_Member = Member({
          userName,
          sex,
          mobile,
          email,
          address,
          grade,
          status,
         time
        });
        new_Member.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败!';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功了!';
            resData.id = data._id;
            resData.userName = data.userName;
            resData.sex = data.sex;
            resData.mobile = data.mobile;
            resData.email = data.email;
            resData.address = data.address;
            resData.grade = data.grade;
            resData.status = data.status;
            res.json(resData);
          }
        });
      }
      break;
    case 'get_page_count':
      Member.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
      // 查询用的页码
    case 'get_find_count':
      let name1 = req.query.name;
      let hehe1 = req.query.grade;
      Member.count({
        [hehe1]: name1
      }, (err, n) => {
        console.log(n)
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Member.find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            console.log(err)
            // console.log(data)
            let arr = [];
            for (var o of data) {
              let obj = {
                time: o.time,
                id: o._id,
                userName: o.userName,
                sex: o.sex,
                mobile: o.mobile,
                email: o.email,
                address: o.address,
                grade: o.grade,
                status: o.status,
                time:o.time
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
      //删除
    case 'del':
      id = req.query.id;
      Member.remove({
        _id: id
      }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
      //批量删除
    case 'delAll':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Member.remove({
          _id: l[i]
        }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';

          } else {
            resData.code = -1;
            resData.msg = '删除失败';

          }
        });
      }
      res.json(resData);
      break;
      // 查询订单的
    case 'findName':
      let name = req.query.name;
      let hehe = req.query.grade;
      let num = req.query.num;

      Member.find({
          [hehe]: name
        })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              time: o.time,
              id: o._id,
              userName: o.userName,
              sex: o.sex,
              mobile: o.mobile,
              email: o.email,
              address: o.address,
              grade: o.grade,
              number: o.number,
              status: o.status,
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;


    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

//修改数据
router.post('/member/update', (req, res, next) => {
  // console.log(req.body);

  let id = req.body.id;
  let userName = req.body.userName;
  let sex = req.body.sex;
  let mobile = Number(req.body.mobile);
  let email = req.body.email;
  let address = req.body.address;
  let grade = req.body.grade;
 let status = req.body.status;
  let obj = {
    id,
   userName,
   sex,
   mobile,
   email,
   address,
   grade,
   status
  }
  // console.log(obj)
  Member.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.time = data.time;
      resData.id = data._id;
      resData.userName = data.userName;
      resData.sex = data.sex;
      resData.mobile = data.mobile;
      resData.email = data.email;
      resData.address = data.address;
      resData.grade = data.grade;
       resData.status = data.status;
      res.json(resData);
    }
  });
});




//留言
router.get('/message', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 6;

  switch (act) {
    case 'add':
      let onOff = req.query.onOff; 
      let checked = false; //是否选中
      // let time = +new Date; //加入时间
      let MessNumber = +new Date; //编号
      let userName = req.query.userName; //用户名
      let mess = req.query.mess;//留言内容
      let status = req.query.status; //状态

      if (!userName) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        userName = userName.replace('\n', '');
        let new_Message = Message({
          userName,
          onOff,
          checked,
          time,
          MessNumber,
          status,
          mess

        });
        new_Message.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败!';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功了!';
            resData.id = data._id;
            resData.userName = data.userName;
            resData.MessNumber = data.MessNumber;
            resData.mess = data.mess;
            resData.onOff = data.onOff;
            resData.checked = data.checked;
            resData.time = data.time;
            resData.status = data.status;
            res.json(resData);
          }
        });
      }
      break;
    case 'get_page_count':
      Message.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;


      // 查询用的页码
    case 'get_find_count':
      let name1 = req.query.name;
      let hehe1 = req.query.status;
      Message.count({
        [hehe1]: name1
      }, (err, n) => {
        console.log(n)
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Message.find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                userName: o.userName,
                MessNumber: o.MessNumber,
                onOff: o.onOff,
                checked: o.checked,
                time: o.time,
                mess:o.mess,
                status: o.status
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
      //删除
    case 'del':
      id = req.query.id;
      Message.remove({
        _id: id
      }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
      //批量删除
    case 'delAll':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Message.remove({
          _id: l[i]
        }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';

          } else {
            resData.code = -1;
            resData.msg = '删除失败';

          }
        });
      }
      res.json(resData);
      break;
      // 查询商品名称
    case 'findName':
      let name = req.query.name;
      let hehe = req.query.status;
      let num = req.query.num;

      Message.find({
          [hehe]: name
        })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              userName: o.userName,
              MessNumber: o.MessNumber,
              checked: o.checked,
              mess: o.mess,
              time: o.time,
              status: o.status
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});

//管理员
router.get('/admini', (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 6;

  switch (act) {
    case 'add':
      let onOff = req.query.onOff; 
      let checked = false; //是否选中
      // let time = +new Date; //加入时间
      let number = +new Date; //编号
      let loginName = req.query.loginName; //登录名
      let mobile = req.query.mobile;//手机
      let email = req.query.email; //邮箱
      let role = req.query.role;
      let status = req.query.status; //状态

      if (!loginName) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        let time = +new Date();
        loginName = loginName.replace('\n', '');
        let new_Admini = Admini({
          loginName,
          onOff,
          checked,
          time,
          number,
          mobile,
          email,
          role,
          status,
         

        });
        new_Admini.save((err, data) => {
          console.log('这是我的err：' + err);
          if (err) {
            resData.code = -1;
            resData.msg = '提交失败!';
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = '提交成功了!';
            resData.id = data._id;
            resData.loginName = data.loginName;
            resData.number = data.number;
            resData.mobile = data.mobile;
            resData.email = data.email;
            resData.role = data.role;
            resData.onOff = data.onOff;
            resData.checked = data.checked;
            resData.time = data.time;
            resData.status = data.status;
            res.json(resData);
          }
        });
      }
      break;
    case 'get_page_count':
      Admini.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;


      // 查询用的页码
    case 'get_find_count':
      let name1 = req.query.name;
      let hehe1 = req.query.status;
      Admini.count({
        [hehe1]: name1
      }, (err, n) => {
        console.log(n)
        resData.code = 0;
        resData.msg = '页数获取成功！当前设置为' + PAGE_SIZE + '条数据一分页';
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case 'get':
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = '参数错误';
        res.json(resData);
      } else {
        Admini.find({})
          .sort('-time')
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                loginName: o.loginName,
                number: o.number,
                onOff: o.onOff,
                checked: o.checked,
                time: o.time,
                mobile: o.mobile,
                email: o.email,
                role: o.role,
                status: o.status
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
      //删除
    case 'del':
      id = req.query.id;
      Admini.remove({
        _id: id
      }, (err) => {
        if (!err) {
          resData.code = 0;
          resData.msg = '删除成功';
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = '删除失败';
          res.json(resData);
        }
      });
      break;
      //批量删除
    case 'delAll':
      console.log(req.query);
      let all = req.query.all;
      let l = JSON.parse(all);
      console.log(l);
      for (let i = 0; i < all.length; i++) {
        Admini.remove({
          _id: l[i]
        }, (err) => {
          if (!err) {
            resData.code = 0;
            resData.msg = '删除成功';

          } else {
            resData.code = -1;
            resData.msg = '删除失败';

          }
        });
      }
      res.json(resData);
      break;
      // 查询商品名称
    case 'findName':
      let name = req.query.name;
      let hehe = req.query.status;
      let num = req.query.num;

      Admini.find({
          [hehe]: name
        })
        .sort('-time')
        .skip(PAGE_SIZE * (num - 1))
        .limit(PAGE_SIZE)
        .exec((err, data) => {
          console.log(data);
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o._id,
              loginName: o.loginName,
              number: o.number,
              checked: o.checked,
              mobile: o.mobile,
              email: o.email,
              role: o.role,
              time: o.time,
              status: o.status
            };
            arr.push(obj);
          }
          res.json(arr);
        })
      break;
    default:
      resData.code = -1;
      resData.msg = '参数错误';
      res.json(resData);
  }

});
//修改数据
router.post('/admini/update', (req, res, next) => {
  // console.log(req.body);

  let id = req.body.id;
  let loginName = req.body.loginName;
  let number = +new Date;
  let mobile = Number(req.body.mobile);
  let email = req.body.email;
  let role = req.body.role;
  let status = req.body.status;
  let obj = {id,loginName,number,mobile,email,role,status}
  console.log(obj)
  Admini.findByIdAndUpdate(id, obj, (err, data) => {
    console.log('这是我的err：' + err);
    if (err) {
      resData.code = -1;
      resData.msg = '更新失败！';
      res.json(resData);
    } else {
      resData.code = 0;
      resData.msg = '更新成功！';
      resData.number = data.number;
      resData.id = data._id;
      resData.loginName = data.loginName;
      resData.role = data.role;
      resData.mobile = data.mobile;
      resData.email = data.email;
      resData.time = data.time;
       resData.status = data.status;
      res.json(resData);
    }
  });
});

module.exports = router;