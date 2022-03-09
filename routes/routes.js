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

//@desc     Get Articles & count of articles with specific tag on specific date
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
            $gte: new Date(start),
            $lte: new Date(end),
          },
          tags: tagName,
        },
      ],
    };

    //Count of article for the date with the tag
    const tagCount = await Article.count(requiredCondition);

    //10 Articles Id from latest date posted with the tag
    const sortedArticle = await Article.aggregate([
      {
        //Syntax for aggregate doesn't match the requiredCondition condition

        $match: {
          date: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
          tags: tagName,
        },
      },
      { $group: { _id: '$_id' } },
      { $sort: { date: -1 } },
      { $limit: 10 },
    ]);

    finalArticleId = sortedArticle.map(function (obj) {
      return obj._id;
    });

    //Finding the related tags
    const relatedTags = await Article.distinct('tags', requiredCondition);

    // Removing query tagName from the array
    const index = relatedTags.indexOf(tagName);
    if (index > -1) {
      relatedTags.splice(index, 1);
    }

    res.status(200).json({
      tag: tagName,
      count: tagCount,
      articles: finalArticleId,
      related_tags: relatedTags,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
