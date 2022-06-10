module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define(
        process.env.DB_TABLE_POINT,
        {
            point_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
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
            tableName: process.env.DB_TABLE_POINT,
        }
    );
};