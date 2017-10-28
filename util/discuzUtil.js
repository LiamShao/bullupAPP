var connection = require('./mysql.js');
//发帖
exports.insertPosting = function(data,callback) {
     connection.query('insert into bullup_app_article (bullup_author_id,bullup_dateline,bullup_article_title,bullup_article_picture,bullup_article_content) values (?, ?, ?, ?, ?)', [data], function (err, results){
            if (err) throw err;
            callback(results);
    });
}
//查询全部帖子
exports.showPosting = function(callback){
     connection.query('select * from bullup_app_article  order by  bullup_dateline  desc', function (err, results){
            if (err) throw err;
            callback(results);
});
}
//查询精选帖子
exports.choicenessPosting = function(callback){
     connection.query('select * from bullup_app_article where bullup_article_flag=1', function (err, results){
            if (err) throw err;
            callback(results);
     });
    }
//查询热门帖子
exports.hotPosting = function(callback){
    //评论数最多的前十个帖子
     connection.query('select *,count(*) from bullup_app_article t1 left join bullup_app_comments t2 on t1.bullup_article_id=t2.bullup_article_id group  by t1.bullup_article_id order by count(*) desc limit 10;',function(err,results){
            if (err) throw err;
            callback(results);
     }) 
        
// select bullup_app_article.*,count(*) from bullup_app_article t1 left join bullup_app_comments t2 on t1.bullup_article_id=t2.bullup_article_id group  by t1.bullup_article_id order by count(*) desc limit 10;
}
//评论
exports.insertComment = function(data,callback){
    connection.query('insert into bullup_app_comments (bullup_article_id,bullup_critic_id,bullup_comment_time,bullup_comment_content,bullup_userName) values (?, ?, ?, ?, ?)', [data.articleId,data.criticId,data.commentTime,data.commentContent,data.userName], function (err, results){
            if (err) throw err;
            callback(results);
    });
}
//评论查询
exports.getComment = function(data,callback){
    // console.log(data.userid);

     connection.query('select * from bullup_app_comments where bullup_article_id=?  ',[data],function (err, results){
            if (err) throw err;
            callback(results);
     });
}
//评论详情
exports.getAllComment = function(data,callback){
     connection.query('select  *,count(*) from bullup_app_comments where bullup_article_id=?',[data],function (err, results){
            if (err) throw err;
            callback(results);
     });
}
//回复
exports.insertReply = function(data,callback){
    connection.query('insert into bullup_app_reply (bullup_comment_id,bullup_reply_content,bullup_userName) values (?, ?, ?)', [data], function (err, results){
            if (err) throw err;
            callback(results);
    });
}
//回复查询
exports.getReply = function(data,callback){
     connection.query('select * from bullup_app_reply where bullup_comment_id=?',[data],function (err, results){
            if (err) throw err;
            callback(results);
     });
}
//回复详情
exports.getAllReply = function(data,callback){
     connection.query('select  *,count(*) from bullup_app_reply where bullup_article_id=?',[data],function (err, results){
            if (err) throw err;
            callback(results);
     });
}


// connection.end();
