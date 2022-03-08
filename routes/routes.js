const express = require('express');
const router = express.Router();

//@desc     Articles
//@route    POST  /articles
router.post('/articles', (req, res) => {
  res.send();
});

//@desc     Article by ID
//@route    GET  /articles/:id
router.post('/articles/:id', (req, res) => {
  res.send();
});

//@desc     Articles by tagname and date
//@route    GET /tags/:tagName/:date
router.post('/tags/:tagName/:date', (req, res) => {
  res.send();
});

module.exports = router;
