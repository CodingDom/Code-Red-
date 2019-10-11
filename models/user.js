const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false,
      unique: {
        args: [true],
        msg: "OOPS! Looks like you already have an account with this email address. Please try to login."
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,20],
          msg: "Password must be 8-20 characters."
        }
      },
      allowNull: false
    },
    blurb: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCreate: function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Favorite, {
      onDelete: "CASCADE"
    });
    User.hasMany(models.Snippet, {
      onDelete: "CASCADE"
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  return User;
};