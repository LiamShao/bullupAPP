var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var bullup_profile_model = sequelize.define('bullup_profile', {
	user_id: Sequelize.INTEGER,
    icon_id: Sequelize.INTEGER
},{
	freezeTableName:true,
	timestamps: false,
	//paranoid: true  //获取不到id的返回值
});

module.exports = bullup_profile_model;