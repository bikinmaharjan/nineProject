const express = require('express');
const Article = require('../models/article');
const router = express.Router();

//@desc     Create new Article
//@route    POST  /articles
router.post('/articles', async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (error) {
    res.status(500).json(error);
  }
});

//@desc     All articles
//@route    GET  /articles/:id
router.get('/articles', (req, res) => {
  res.send('hello');
});

//@desc     Article by ID
//@route    GET  /articles/:id
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json(error);
  }
});

//@desc     Articles by tagname and date
//@route    GET /tags/:tagName/:date
router.get('/tags/:tagName/:date', (req, res) => {
  res.send();
});

module.exports = router;
