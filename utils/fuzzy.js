const animeModel = require('./../models/animeModel');

const User = animeModel.animeModel;

//To send the searched results
const search_title = async function (reqTitle) {
  const search_result = await User.find(
    { $text: { $search: `${reqTitle}` } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(15);
  return search_result;
};

module.exports = { search: search_title };
