var connection = require('./mysql.js');


exports.getSkills = function(data,callback) {
    console.log(data.page);
    let pageNum = data.page;
    var start;
    if(pageNum==1){
        start = 0;
    }else{
        start=pageNum*10-10;
    }
    connection.query('select * from bullup_app_skill order by bullup_publish_time desc limit ?,10',[start],function (err, results){
        if (err) throw err;
        callback(results);
    });
}