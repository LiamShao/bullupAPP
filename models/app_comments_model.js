var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var app_comments_model = sequelize.define('app_comments', {
	bullup_article_id:Sequelize.INTEGER,
    bullup_critic_id:Sequelize.INTEGER,
    bullup_comment_id:Sequelize.INTEGER,
    bullup_comment_time:Sequelize.DATE,
    bullup_comment_content :Sequelize.STRING,
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = app_comments_model;