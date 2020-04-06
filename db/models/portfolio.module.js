const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  photos: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});
const portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {
  portfolio,
};
