const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    _id: {
      type: String,
      trim: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    photoURL: String,
    signInProvider: String,
    isUserDisabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports.User = mongoose.model('users', UserSchema);
