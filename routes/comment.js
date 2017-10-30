var express = require('express');
var router = express.Router();
var URL = require('url');
var discuzUtil = require('../util/discuzUtil.js');
var formidable = require('formidable');

router.get('/', function(req, res, next) {
    res.send("hello  斗牛");;
});
//评论查询
//http://192.168.2.162:3000/comment/getComment?articleid=
router.get('/getComment',function(req,res,next){
    var data = URL.parse(req.url,true).query;
    discuzUtil.getComment(data.articleid,function(results){
      if(results){
        res.send({"status":1,"data":results});
      }else{
         res.send({"status":0,"text":"数据库查询错误，请稍后再试!"});
      }
  })
})
//评论详情
router.get('/getComment',function(req,res,next){
    var data = URL.parse(req.url,true).query;
    discuzUtil.getAllComment(data.articleid,function(results){
      if(results){
        res.send({"status":1,"data":results});
      }else{
         res.send({"status":0,"text":"数据库查询错误，请稍后再试!"});
      }
  })
})
//评论插入
router.get('/insertComment',function(req,res,next){
    var data = URL.parse(req.url,true).query;
    console.log(data);
    var form = new formidable.IncomingForm();   //创建上传表单 
    form.encoding = 'utf-8';        //设置编辑 
    form.uploadDir = './public/images/reply/';     //设置上传目录 文件会自动保存在这里 
    form.keepExtensions = true;     //保留后缀 
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M 
    form.parse(req, function (err, fields, files) { 
        if(err){ 
            console.log(err); 
            return;
        } 
       fields.articleId = data.articleId;
       fields.replyContent = data.replyContent;
       fields.userName = data.userName;
       fields.replyPicture=files.articlePicture.path.replace('public','');
    discuzUtil.insertComment(fields,function(results){
         res.send({"status":1});
    });
    
  })
})

module.exports = router;