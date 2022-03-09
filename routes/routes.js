const express = require('express');
const res = require('express/lib/response');
const Article = require('../models/article');
const router = express.Router();
const moment = require('moment');

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
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json(error);
  }
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
router.get('/tags/:tagName/:date', async (req, res) => {
  try {
    tagName = req.params.tagName;
    reqDate = req.params.date;

    dDate = moment(reqDate).format('YYYY-MM-DD');

    start = moment(moment(dDate).startOf('day')).local();
    end = moment(moment(dDate).endOf('day')).local();

    const requiredCondition = {
      $and: [
        {
          date: {
            $gte: start,
            $lte: end,
          },
          tags: tagName,
        },
      ],
    };
    //Getting Articles with the same date
    articleByDateAndTag = await Article.find({
      $and: [
        {
          date: {
            $gte: start,
            $lte: end,
          },
          tags: tagName,
        },
      ],
    });

    //Count of article for the date with the tag
    const tagCount = await Article.count(requiredCondition);

    const articleIdWithTag = await Article.distinct('_id', requiredCondition);

    //Finding the related tags
    const relatedTags = await Article.distinct('tags', requiredCondition);

    res.status(200).json({
      tag: tagName,
      // articleByDateAndTag,
      count: tagCount,
      articles: articleIdWithTag,
      related_tags: relatedTags,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
