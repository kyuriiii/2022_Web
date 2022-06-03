const Sequelize = require("sequelize");

const config = require("../config/secure/config.json")[process.env.DB_MODE];
const db = {};

const sequelize = new Sequelize(    
    config.database,
    config.username,
    config.password,
    config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Pay = require("./Pay")(sequelize, Sequelize);
db.Point = require("./Point")(sequelize, Sequelize);
db.Lecture = require("./Lecture")(sequelize, Sequelize);

db.User.hasMany(db.Post, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "set null",
});
db.Post.belongsTo(db.User, {
    foreignKey: "id",
    sourceKey: "user_id",
    onDelete: "set null",
});
db.User.hasMany(db.Point, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "set null",
});
db.Point.belongsTo(db.User, {
    foreignKey: "id",
    sourceKey: "user_id",
    onDelete: "set null",
});
db.User.hasMany(db.Pay, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "set null",
});
db.Pay.belongsTo(db.User, {
    foreignKey: "id",
    sourceKey: "user_id",
    onDelete: "set null",
});
db.Lecture.hasMany(db.Post, {
    foreignKey: "lecture_id",
    sourceKey: "id",
    onDelete: "set null",
});
db.Post.belongsTo(db.Lecture, {
    foreignKey: "id",
    sourceKey: "lecture_id",
    onDelete: "set null",
});
db.Post.hasOne(db.Pay, {
    foreignKey: "post_id",
    sourceKey: "id",
    onDelete: "cascade",
});
db.Pay.belongsTo(db.Post, {
    foreignKey: "id",
    sourceKey: "post_id",
    onDelete: "cascade",
});
module.exports = db;
