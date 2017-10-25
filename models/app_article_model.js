var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var app_article_model = sequelize.define('app_article', {
	bullup_article_id:Sequelize.INTEGER,
    bullup_author_id:Sequelize.INTEGER,
    bullup_dateline:Sequelize.DATE,
    bullup_article_title:Sequelize.STRING,
    bullup_article_picture:Sequelize.STRING,
    bullup_article_content:Sequelize.STRING,
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = app_article_model;