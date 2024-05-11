const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  drivingExperience: {
    type: String,
    required: false,
  },
  licenseYear: {
    type: Number,
    required: false,
  },
  profileImage: { // Profile image filename
    type: String,
    required: false,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
