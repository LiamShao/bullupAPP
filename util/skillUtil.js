var connection = require('./mysql.js');


exports.getSkills = function(callback) {
    connection.query('select * from bullup_app_skill',function (err, results){
        if (err) throw err;
        callback(results);
    });
}