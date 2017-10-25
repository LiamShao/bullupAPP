var connection = require('./mysql.js');


exports.getCompetitions = function(callback) {
    connection.query('select * from bullup_app_competition',function (err, results){
        if (err) throw err;
        callback(results);
    });
}