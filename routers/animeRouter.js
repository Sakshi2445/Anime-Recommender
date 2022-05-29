const express = require('express');
const animeController = require('./../controllers/animeController');

const router = express.Router();

router.route('/getRecommendation').get(animeController.getRecommendation);
router.route('/getAnimes').get(animeController.getAnimes);
router.route('/getAllAnimes').get(animeController.getAllAnimes);

module.exports = router;
