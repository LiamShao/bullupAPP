var express = require('express');
var router = express.Router();
var URL = require('url');
var sequelize = require('../models/modelHeader.js')();
var userBaseModel = require('../models/user_base_model.js');
var bullupProfileModel = require('../models/bullup_profile_model.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
router.get('/login',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  userBaseModel.findOne({where:{user_account:params.account,user_password:params.password}})
  .then(function(rs){
    if(rs!=null&&rs.length!=0){
      let sql = 'select icon_id from bullup_profile where user_id=?';
      sequelize.query(sql,{replacements:[rs.user_id]})
      .then(function(rs2){
          var temp = {};
          temp.status = 1;
          temp.data = rs;
          temp.icon = rs2[0][0].icon_id;
          res.send(temp);
      });
    }else{
      res.send({"status":0,"text":"用户名或密码错误!"});
    }
	});
});

//对战记录
router.get('/getGameHistory',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  let sql = 'select * from bullup_battle_record where bullup_battle_paticipants_red like ? or bullup_battle_paticipants_blue like ?';
  sequelize.query(sql,{replacements:['%'+params.nickname+'%','%'+params.nickname+'%']})
  .then(function(rs){
    if(rs==null&&rs.length==0){
      res.send({"status":0,"text":"您的对战记录为空"});
    }else{
      var temp = {};
      temp.status = 1;
      temp.data = rs[0];
      res.send(temp);
    }
  });
});



module.exports = router;
