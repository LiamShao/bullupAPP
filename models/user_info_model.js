var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var user_info_model = sequelize.define('user_info', {
	user_id: Sequelize.INTEGER,
    user_phone: Sequelize.STRING,
    user_mail: Sequelize.STRING,
    user_country: Sequelize.STRING,
    user_province: Sequelize.STRING,
    user_city:Sequelize.STRING,
    user_idcard_type:Sequelize.STRING,
    user_idcard_number:Sequelize.STRING,
    user_address:Sequelize.STRING,
    user_postcode:Sequelize.STRING,
    user_realname:Sequelize.STRING,
    last_login_time:Sequelize.DATE
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = user_info_model;