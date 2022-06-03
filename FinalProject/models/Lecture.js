module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define(
        process.env.DB_TABLE_LECTURE,
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            professor: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER.UNSIGNED,
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
            tableName: process.env.DB_TABLE_LECTURE,
        }
    );
};