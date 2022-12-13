const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//mirar compress por cloudinary 

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('secretKey', process.env.SECRET_KEY_JWT)
require('../routes')(app);

app.disable('x-powered-by')
module.exports = app;


