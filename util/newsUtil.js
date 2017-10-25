var connection = require('./mysql.js');


exports.getNews = function(callback) {
    connection.query('select * from bullup_app_news',function (err, results){
        if (err) throw err;
        callback(results);
    });
}