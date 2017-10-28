var express = require('express');
var router = express.Router();
var URL = require('url');
var sequelize = require('../models/modelHeader.js')();
var userBaseModel = require('../models/user_base_model.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
//http://192.168.2.162:3000/users/login?account=*&password=*
router.get('/login',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  userBaseModel.findOne({where:{user_account:params.account,user_password:params.password}})
  .then(function(rs){
    if(rs!=null&&rs.length!=0){
      let sql = 'select icon_id from bullup_profile where user_id=?';
      sequelize.query(sql,{replacements:[rs.user_id]})
      .then(function(rs2){
          let temp = {};
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
//http://192.168.2.162:3000/users/getGameHistory?nickname=*
router.get('/getGameHistory',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  let sql = 'select * from bullup_battle_record where bullup_battle_paticipants_red like ? or bullup_battle_paticipants_blue like ?';
  sequelize.query(sql,{replacements:['%'+params.nickname+'%','%'+params.nickname+'%']})
  .then(function(rs){
    console.log(rs);
    if(rs[0]!=null&&rs[0].length!=0){
      let temp = {};
      temp.status = 1;
      let tmpData = rs[0];
      tmpData.sort(function(a,b){ 
        return a['bullup_battle_time'] < b['bullup_battle_time'] ? 1 : a['bullup_battle_time'] == b['bullup_battle_time'] ? 0 : -1;
      });
      temp.data = tmpData;
      res.send(temp);
    }else{
      res.send({"status":0,"text":"您的对战记录为空"});
    }
  });
});

//根据日期查询对战记录
//http://192.168.2.162:3000/users/getGameHistoryByDate?nickname=*&startTime=*&endTime=*
router.get('/getGameHistoryByDate',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  let sql = 'select * from bullup_battle_record where bullup_battle_paticipants_red like ? or bullup_battle_paticipants_blue like ? having bullup_battle_time>=? and bullup_battle_time<=?';
  sequelize.query(sql,{replacements:['%'+params.nickname+'%','%'+params.nickname+'%',params.startTime,params.endTime]})
  .then(function(rs){
    console.log(rs);
    if(rs[0]!=null&&rs[0].length!=0){
      let temp = {};
      temp.status = 1;
      let tmpData = rs[0];
      tmpData.sort(function(a,b){ 
        return a['bullup_battle_time'] < b['bullup_battle_time'] ? 1 : a['bullup_battle_time'] == b['bullup_battle_time'] ? 0 : -1;
      });
      temp.data = tmpData;
      res.send(temp);
    }else{
      res.send({"status":0,"text":"您的对战记录为空"});
    }
  });
});

module.exports = router;
