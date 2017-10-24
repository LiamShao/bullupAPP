var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var user_base_model = sequelize.define('user_base', {
	user_id: {type:Sequelize.INTEGER,primaryKey: true},
    user_account: Sequelize.STRING,
    user_password: Sequelize.STRING,
    user_nickname: Sequelize.STRING,
    user_role: Sequelize.INTEGER
},{
    freezeTableName:true,
	timestamps: false,
	//paranoid: true  //获取不到id的返回值
});

module.exports = user_base_model;