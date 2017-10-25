var mysql = require('mysql');
var Sequelize = require('sequelize'); 
var seqConn = null;
var sequelize = function(){
		if(seqConn==null){
			console.log('创建连接');
			seqConn=new Sequelize('bullup', null, null, {
			    host: '67.216.196.197',
				dialect: 'mysql',
				dialectOptions: {
					charset: 'utf8'
				 },
			});
		}
		return seqConn;
	}
	
module.exports = sequelize;