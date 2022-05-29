const mongoose = require('mongoose');
const score_model = require('./../models/scoreModel');
const anime_model = require('./../models/animeModel');
const tfidf = require('natural');
const { TfIdf } = require('natural');
const Vector = require('vector-object');

//Gets us the string created from the array separated by comma
const getdata = async () => {
  const t = await anime_model.animeModel.find();
  //creating an array of object
  let arr = [];
  t.forEach((element) => {
    let tempobj = {};
    var services = element.genre;
    services = services.split(',');
    services[0] = services[0].substring(1);
    services[services.length - 1] = services[services.length - 1].substring(
      0,
      services[services.length - 1].length - 1
    );
    services.forEach((x, i) => {
      services[i] = services[i].includes('"')
        ? services[i].replaceAll('"', '').trim()
        : services[i].replaceAll("'", '').trim();
      services[i].toLowerCase();
    });
    //creates an object
    tempobj = { id: element.uid, content: services.join(' ') };
    //pushes the object in the array of object
    arr.push(tempobj);
  });
  return arr;
};

//Create Vectors From TfIdf
const createVectorsFromDocs = (processedDocs) => {
  //creating tfidf object
  const tfidf = new TfIdf();

  processedDocs.forEach((processedDocument) => {
    tfidf.addDocument(processedDocument.content);
  });
  //creating a vector of object based on the tfidf counting
  const documentVectors = [];

  for (let i = 0; i < processedDocs.length; i += 1) {
    const processedDocument = processedDocs[i];
    const obj = {};

    const items = tfidf.listTerms(i);

    for (let j = 0; j < items.length; j += 1) {
      const item = items[j];
      obj[item.term] = item.tfidf;
    }

    const documentVector = {
      id: processedDocument.id,
      vector: new Vector(obj),
    };

    documentVectors.push(documentVector);
  }
  return documentVectors;
};

//Creates Similarity
const calcSimilarities = (docVectors) => {
  // number of results that you want to return.
  const MAX_SIMILAR = 15;
  // min cosine similarity score that should be returned.
  const MIN_SCORE = 0.65;
  const data = {};
  for (let i = 0; i < docVectors.length; i += 1) {
    const documentVector = docVectors[i];
    const { id } = documentVector;
    data[id] = [];
  }

  //creates a cosine relation between each and every anime
  for (let i = 0; i < docVectors.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      const idi = docVectors[i].id;
      const vi = docVectors[i].vector;
      const idj = docVectors[j].id;
      const vj = docVectors[j].vector;
      const similarity = vi.getCosineSimilarity(vj);
      if (similarity > MIN_SCORE) {
        data[idi].push({ id: idj, score: similarity });
        data[idj].push({ id: idi, score: similarity });
      }
    }
  }

  // finally sort the similar documents by descending order
  Object.keys(data).forEach(async (id) => {
    data[id].sort((a, b) => b.score - a.score);

    if (data[id].length > MAX_SIMILAR) {
      data[id] = data[id].slice(0, MAX_SIMILAR);
      //creates an object to be stored in the score-model
      const test = new score_model({
        uid: id,
        score: data[id],
      });
      await test.save();
    }
  });
  return data;
};

//Get Similar Documents
const getSimilarDocuments = (id, trainedData) => {
  let similarDocuments = trainedData[id];
  if (similarDocuments === undefined) {
    return [];
  }
  return similarDocuments;
};

//exports the given trained data
exports.trainData = async () => {
  try {
    //function call every functions
    const po = await getdata();
    const store = createVectorsFromDocs(po);
    const op = calcSimilarities(store);
    const res = getSimilarDocuments(28891, op);
    return res;
  } catch (err) {
    console.log(err);
  }
};
// trainData();
