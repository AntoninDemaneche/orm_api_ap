module.exports = (sequelize, DataTypes) => {
  var Gif = sequelize.define("Gif", {
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
  return Gif;
};
