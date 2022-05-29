const anime_model = require('./../models/animeModel');
const score_model = require('./../models/scoreModel');
const fuzzy = require('./../utils/fuzzy.js');

//Route to get the anime which is searched
exports.getAnimes = async (req, res) => {
  const anime_found = await fuzzy.search(req.query.keyword);
  res.json({
    anime: anime_found,
  });
};

//Route to get all the animes
exports.getAllAnimes = async (req, res) => {
  //defining the limit to be displayed
  const limit = 5;
  let req_skip = limit * parseInt(req.query.page || 1);

  //filtering the database search
  const animeListdata = await anime_model.animeModel
    .find()
    .limit(50)
    .skip(req_skip)
    .sort('_id');
  res.json({
    animeListdata,
  });
};

//Route to get the Recommended Animes based on selection
exports.getRecommendation = async (req, res) => {
  //aggregation based on distance
  let recommendadtion = await anime_model.animeModel.aggregate([
    {
      $match: {
        _id: { $ne: req.query._id },
      },
    },
    {
      $project: {
        uid: 1,
        title: 1,
        score: 1,
        ranked: 1,
        synopsis: 1,
        img_url: 1,
        aired: 1,
        episodes: 1,
        members: 1,
        popularity: 1,
        link: 1,
        genre: 1,
        distance: {
          $sqrt: {
            $add: [
              {
                $pow: [{ $subtract: [Number(req.query.score), '$score'] }, 2],
              },
              {
                $pow: [{ $subtract: [Number(req.query.ranked), '$ranked'] }, 2],
              },
            ],
          },
        },
      },
    },
    {
      $match: {
        distance: { $ne: null },
      },
    },
    {
      $sort: { distance: 1 },
    },
    {
      $limit: 10,
    },
  ]);

  //Creating Array of the uid's that are matched
  const matched_uid = await score_model.find({
    uid: req.query.uid * 1,
  });

  //creating array of that
  let arr_id = [];
  matched_uid[0].score.forEach((obj) => {
    arr_id.push(obj.id);
  });

  //aggregation based on Cosine-Similarity
  const matched_result = await anime_model.animeModel.aggregate([
    {
      $match: {
        uid: {
          $in: arr_id,
        },
      },
    },
    {
      $limit: 10,
    },
  ]);

  //combining the recommendation and matched_result in recommendation
  recommendadtion = recommendadtion.concat(matched_result);
  res.json({
    recommendadtion,
  });
};
