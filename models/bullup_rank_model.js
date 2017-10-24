var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var bullup_rank_model = sequelize.define('bullup_rank', {
	user_id: Sequelize.INTEGER,
    user_nickname: Sequelize.STRING,
    bullup_strength_score: Sequelize.INTEGER,
    bullup_strength_rank: Sequelize.INTEGER,
    bullup_wealth_sum: Sequelize.INTEGER,
    bullup_wealth_rank: Sequelize.INTEGER,
    bullup_wins_sum: Sequelize.INTEGER,
    bullup_wins_rank: Sequelize.INTEGER,
    user_icon_id: Sequelize.INTEGER
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = bullup_rank_model;