var connection = require('./mysql.js');
//发帖
exports.posting = function(res, callback) {
     connection.query('insert into bullup_app_article (bullup_author_id,bullup_dateline,bullup_article_title,bullup_article_picture,bullup_article_content) values (?, ?, ?, ?,?)', [userId2, userId1], function (err, results){
            if (err) throw err;
    });
}
//查询全部帖子
exports.showPosting = function(res, callback){
     connection.query('select * from bullup_app_article', function (err, results){
            if (err) throw err;
});
}
//查询精选帖子
exports.choicenessPosting = function(res,callback){
     connection.query('select * from bullup_app_article where bullup_article_flag=1', function (err, results){
            if (err) throw err;
     });
    }
//查询热门帖子
exports.hotPosting = function(res,callback){
    //评论数最多的前十个帖子
     connection.query('select bullup_app_article.*,count(*) from bullup_app_article t1 left join bullup_app_comments t2 on t1.bullup_article_id=t2.bullup_article_id group  by t1.bullup_article_id order by count(*) desc limit 10',[ ],function(err,results){
            if (err) throw err;
     }) 
        
// select bullup_app_article.*,count(*) from bullup_app_article t1 left join bullup_app_comments t2 on t1.bullup_article_id=t2.bullup_article_id group  by t1.bullup_article_id order by count(*) desc limit 10;
}
//评论
exports.comment = function(res,callback){
    connection.query('insert into bullup_app_comments (bullup_article_id,bullup_critic_id,bullup_comment_time,bullup_comment_content) values (?, ?, ?, ?)', [userId2, userId1], function (err, results){
            if (err) throw err;
    });
}
//回复
exports.reply = function(res,callback){
    connection.query('insert into bullup_app_reply (bullup_replie_id,bullup_comment_id,bullup_reply_content ) values (?, ?, ?)', [userId2, userId1], function (err, results){
            if (err) throw err;
    });
}
// connection.end();
