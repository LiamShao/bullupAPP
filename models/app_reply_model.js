var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var app_reply_model = sequelize.define('app_reply', {
	bullup_article_id:Sequelize.INTEGER,
    bullup_critic_id:Sequelize.INTEGER,
    bullup_author_id:Sequelize.INTEGER,
    bullup_reply_content:Sequelize.STRING
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = app_reply_model;