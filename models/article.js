const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
