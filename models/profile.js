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
        allowNull: true,
        validate: {
          invalidEmail(email) {
            if(this.email) {
              const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (re.test(String(email).toLowerCase()) === false) {
                throw new Error("Invalid email address.")
              }
            }
          }
        }
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING
      },
      address_other: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      zip: {
        type: DataTypes.STRING
      },
      valentines_day: {
        type: DataTypes.BOOLEAN
      },
      hanukkah: {
        type: DataTypes.BOOLEAN
      },
      christmas: {
        type: DataTypes.BOOLEAN
      },
      mothers_day: {
        type: DataTypes.BOOLEAN
      },
      fathers_day: {
        type: DataTypes.BOOLEAN
      },
      halloween: {
        type: DataTypes.BOOLEAN
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