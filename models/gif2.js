module.exports = (sequelize, DataTypes) => {
var Gif2 = sequelize.define("Gif2", {
    text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [1, 700]
    }
    },
    complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    }
});
return Gif2;
};
  