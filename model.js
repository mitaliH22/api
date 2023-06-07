const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  designation: {
    type: String,
  },
  password: {
    type: String,
  },
});


const User = mongoose.model("User", UserSchema);

module.exports = User;

