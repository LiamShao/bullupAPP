var express = require('express');
var router = express.Router();
var URL = require('url');
var competitionUtil = require('../util/competitionUtil.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//技巧
//http://192.168.2.162:3000/competition/getCompetitions?page=*
router.get('/getCompetitions',function(req,res,next){
    var params = URL.parse(req.url,true).query;
    competitionUtil.getCompetitions(params,function(results){
    if(results){
      for (let i=0;i<results.length;i++){
        if(results[i].bullup_competition_picture!=null&&results[i].bullup_competition_picture.length!=0){
            let picArr = results[i].bullup_competition_picture.split(',');
            results[i].bullup_competition_picture = picArr;
            let len = results[i].bullup_competition_picture.length;
            for(let j=0;j<len;j++){
              results[i].bullup_competition_picture[j] = 'http://192.168.2.162:3000/'+results[i].bullup_competition_picture[j];
            }
        }else{
            results[i].bullup_competition_picture = [];
        }
      }
      results.sort(function(a,b){ 
        return a['bullup_competition_time'] < b['bullup_competition_time'] ? 1 : a['bullup_competition_time'] == b['bullup_competition_time'] ? 0 : -1;
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
