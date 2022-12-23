const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
    return super.init(
        {
        division: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
        },
        title: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
        },
        content: {
            type: Sequelize.STRING(1000),
            allowNull: false,
            unique: true,
        },
        writer: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
        },
        created_at: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        views: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
            unique: true,
        },
        isFile: {
            type:Sequelize.STRING(200),
            allowNull:true,
            unique : false,
        },
        
        },
        {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Board",
        tableName: "board",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
        }
    );
    }

    static associate(db) {
        //db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    }
};
