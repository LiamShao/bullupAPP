var Sequelize = require('sequelize'); 
var sequelize =require('./modelHeader')();

var bullup_battle_model = sequelize.define('bullup_battle', {
	bullup_battle_id: Sequelize.INTEGER,
    bullup_battle_compitetion_type: Sequelize.STRING,
    bullup_compitetion_id: Sequelize.INTEGER,
    bullup_battle_name: Sequelize.STRING,
    bullup_battle_map_type: Sequelize.STRING,
    bullup_battle_bet:Sequelize.INTEGER,
    bullup_battle_teamnumber:Sequelize.INTEGER,
    bullup_battle_paticipants_red:Sequelize.STRING,
    bullup_battle_paticipants_blue:Sequelize.STRING,
    bullup_battle_time:Sequelize.DATE,
    bullup_battle_duration:Sequelize.INTEGER,
    bullup_battle_result:Sequelize.STRING
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
	});

module.exports = bullup_battle_model;