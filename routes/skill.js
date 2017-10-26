var express = require('express');
var router = express.Router();
var URL = require('url');
var skillUtil = require('../util/skillUtil.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//技巧
//http://192.168.2.162:3000/skill/getSkills
router.get('/getSkills',function(req,res,next){
  var params = URL.parse(req.url,true).query;
  skillUtil.getSkills(params,function(results){
    if(results){
      for (let i=0;i<results.length;i++){
        if(results[i].bullup_skill_picture!=null&&results[i].bullup_skill_picture.length!=0){
            let picArr = results[i].bullup_skill_picture.split(',');
            results[i].bullup_skill_picture = picArr;
            let len = results[i].bullup_skill_picture.length;
            for(let j=0;j<len;j++){
              results[i].bullup_skill_picture[j] = 'http://192.168.2.162:3000/'+results[i].bullup_skill_picture[j];
            }
        }else{
            results[i].bullup_skill_picture = "";
        }
      }
      results.sort(function(a,b){ 
        return a['bullup_publish_time'] < b['bullup_publish_time'] ? 1 : a['bullup_publish_time'] == b['bullup_publish_time'] ? 0 : -1;
      });
      let temp = {};
      temp.status = 1;
      temp.data = results;
      res.send(temp);
    }else{
      res.send({"status":0,"data":[]});
    }
  });
});

module.exports = router;
