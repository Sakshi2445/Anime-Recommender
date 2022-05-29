const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app.js');
const traindata = require('./controllers/scoreController');
dotenv.config({ path: './config.env' });

//Connecting The DataBase
mongoose.connect(process.env.DB).then(() => {
  console.log('DB connection successful');
});

//To check if the Data is Trained or not
if (process.env.TRAINDATA === 'true') {
  traindata.trainData;
} else {
  console.log('Your data is already trained!😊');
}

//Listening on the port
app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${process.env.PORT}`);
});
