const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
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
