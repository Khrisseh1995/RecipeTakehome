const RecipeController = require('./controller/recipes');
const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const mongoDB = 'mongodb://root:example@mongo:27017/tests?authSource=admin';

mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => console.log("Connection Successful"));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors());
app.use(bodyParser.json());
app.use(RecipeController);
app.listen(3000, () => console.log("Listening on port 3000"));