const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['collegeS', 'collegeG'],
    required: true, // User type is required during registration
  },
  AcademicOpinion: {
    type: String,
  },
  NonAcademicOpinion: {
    type: String,
  },
  PlacementOpinion: {
    type: String,
  },
  OverallOpinion: {
    type: String,
  },
  college: {
    type: String,
  },
  branch: {
    type: String,
  },
  year: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.User = User;

