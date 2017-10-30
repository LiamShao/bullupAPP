var mysql = require('mysql');
var Sequelize = require('sequelize'); 
var seqConn = null;
var sequelize = function(){
		if(seqConn==null){
			console.log('创建连接');
			seqConn=new Sequelize('bullup','root','1234', {
				//host: '67.216.196.197',
				host: '18.220.130.245',
				dialect: 'mysql',
				dialectOptions: {
					charset: 'utf8',
					timezone: '+08:00'
				 },
			});
		}
		return seqConn;
	}
	
module.exports = sequelize;