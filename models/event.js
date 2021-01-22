// EVENTS MODEL
module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define('Event', {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATEONLY
      },
      is_annual: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    });
    Event.associate = function(models) {
      Event.belongsToMany(models.Profile, {
        through: "ProfileEvents",
        onDelete: "RESTRICT"
      });
    };
    return Event;
  };