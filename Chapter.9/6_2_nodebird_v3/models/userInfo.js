const Sequelize = require('sequelize');

class UserInfo extends Sequelize.Model {
    static init(sequelize) {
        const userAttr = {
            age : {
                type : Sequelize.NUMBER(2),
                allowNull: true,
            }, 
            gender : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            address : {
                type: Sequelize.STRING(3),
                allowNull : true,
            },
        };


        const userInfoTbl = {
            sequelize,
            timeStamps : true,
            underscored: false,
            modelName : 'UserInfo',
            tableName: 'userInfo',
            paranoid: true,
            charset: 'uft8mb4',
            collate: 'utf8mb4_unicode_ci',
        };

        return super.init(userAttr, userInfoTbl);
    }

    static associate(db) {
        db.UserInfo.belongsTo(db.User);
    }
}

module.exports = UserInfo;