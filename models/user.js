const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Pre-save hook to hash the password on signup -- BCRYPT
userSchema.pre('save', function (next) { // use function(); do not use arrow function bc we need access to "this"
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// Pre-save hook to hash the confirmPassword on signup -- BCRYPT
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('confirmPassword')) return next();
  bcrypt.hash(user.confirmPassword, 10, (err, hash) => {
    if (err) return next(err);
    user.confirmPassword = hash;
    next();
  });
});

// method to check encrypted password on login
userSchema.methods.checkPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

// method to remove user's password for token/sending the response
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  delete user.confirmPassword;
  return user;
};

module.exports = mongoose.model('User', userSchema);
