module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define(
        process.env.DB_TABLE_USER,
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                defaultValue: "",
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            registered: {
                type: "TIMESTAMP",
                defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: process.env.DB_TABLE_USER,
        }
    );
};