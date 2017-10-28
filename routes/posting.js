var express = require('express');
var router = express.Router();
var URL = require('url');
var discuzUtil = require('../util/discuzUtil.js');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("hello  斗牛");
});
//全部帖子
//http://192.168.2.162:3000/posting/getPosting
router.get('/getPosting',function(req,res,next){
  discuzUtil.showPosting(function(results){
    if(results){
      for (let i=0;i<results.length;i++){
        if(results[i].bullup_article_picture !=null&&results[i].bullup_article_picture.length!=0){
          let posArr = results[i].bullup_article_picture.split(',');
          results[i].bullup_article_picture = posArr;
          let len = results[i].bullup_article_picture.length;
          for(let j=0;j<len;j++){
            results[i].bullup_article_picture[j] = 'http://192.168.2.162:3000/'+results[i].bullup_article_picture[j];
          }
        }else{
          results[i].bullup_article_picture = "";
        }
      }
      res.send({"status":1,"data":results});
    }else{
          res.send({"status":0,"text":"数据库查询错误，请稍后再试!"});
      }
  })
})
//精选帖子
//http://192.168.2.162:3000/posting/getChoicePosting
router.get('/getChoicePosting',function(req,res,next){
  discuzUtil.choicenessPosting(function(results){
    if(results){
      for (let i=0;i<results.length;i++){
        if(results[i].bullup_article_picture !=null&&results[i].bullup_article_picture.length!=0){
          let posArr = results[i].bullup_article_picture.split(',');
          results[i].bullup_article_picture = posArr;
          let len = results[i].bullup_article_picture.length;
          for(let j=0;j<len;j++){
            results[i].bullup_article_picture[j] = 'http://192.168.2.162:3000/'+results[i].bullup_article_picture[j];
          }
        }else{
          results[i].bullup_article_picture = "";
        }
      }
       res.send({"status":1,"data":results});
    }else{
           res.send({"status":0,"text":"数据库查询错误，请稍后再试!"});
    }
  })
})
//热门帖子
//http://192.168.2.162:3000/posting/getHotPosting
router.get('/getHotPosting',function(req,res,next){
  discuzUtil.hotPosting(function(results){
    if(results){
      for (let i=0;i<results.length;i++){
        if(results[i].bullup_article_picture !=null&&results[i].bullup_article_picture.length!=0){
          let posArr = results[i].bullup_article_picture.split(',');
          results[i].bullup_article_picture = posArr;
          let len = results[i].bullup_article_picture.length;
          for(let j=0;j<len;j++){
            results[i].bullup_article_picture[j] = 'http://192.168.2.162:3000/'+results[i].bullup_article_picture[j];
          }
        }else{
          results[i].bullup_article_picture = "";
        }
      }
       res.send({"status":1,"data":results});
    }else{
         res.send({"status":0,"text":"数据库查询错误，请稍后再试!"});
    }
  })
})
//帖子插入

router.get('/insertPosting',function(req,res,next){
  var data = URL.parse(req.url,true).query;
  var form = new formidable.IncomingForm();   //创建上传表单 
    form.encoding = 'utf-8';        //设置编辑 
    form.uploadDir = './public/images/posting/';     //设置上传目录 文件会自动保存在这里 
    form.keepExtensions = true;     //保留后缀 
    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M 
    form.parse(req, function (err, fields, files) { 
        if(err){ 
            console.log(err); 
            return;
        } 
       fields.authoId = data.authoId;
       fields.dateline = data.dateline;
       fields.articleTitle = data.articleTitle;
       fields.articlePicture=files.articlePicture.path.replace('public','');
       fields.articleContent=data.articleContent;
  // var data = URL.parse(req.url,true).query;
    discuzUtil.insertPosting(fields,function(results){
      res.send({"status":1});
    });
    });
})



module.exports = router;
