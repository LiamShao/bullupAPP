var mysql  = require('mysql');  
var connection = mysql.createConnection({     
  host     : '192.168.2.163',       
  user     : 'root',              
  password : '',       
  port: '3306',                   
  database: 'discuz', 
}); 
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Mysql connected');   
});

module.exports = connection;