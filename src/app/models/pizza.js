const mongoose = require('../../database');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  size: {
    type: String,
    require: true,
  },
  crustType: {
    type: String,
    require: true,
  },
  toppings: {
    type: [String],
  },
  finalPrice: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pizza = mongoose.model('Pizza', PizzaSchema);

module.exports = Pizza;