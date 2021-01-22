// PROFILES MODEL
module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      relationship: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      phone_number: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      }
    });
    Profile.associate = function(models) {
      Profile.hasOne(models.User, {
        onDelete: "NO ACTION"
      });
    };
    Profile.associate = function(models) {
      Profile.belongsToMany(models.Event, {
        through: "ProfileEvents",
        onDelete: "NO ACTION"
      });
    };
    return Profile;
  };