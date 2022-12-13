const config = require('config-yml');
const mongoose = require("mongoose");
const magic = require('../../utils/magic');
const doctor = require('../entities/entity-doctor');
const patient = require('../entities/entity-patient');
const quote = require('../entities/entity-quote');
const admin = require('../entities/entity-admin')
const dotenv = require('dotenv');
const { setUpCloudinary } = require('../../helpers/cloudinary');
dotenv.config();


let db = {};

if (config.db.mongodb && config.db.mongodb.length > 0) {
  config.db.mongodb.map((c) => {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db[c.nameconn] = {};
    db[c.nameconn].conn = mongoose;
    db[c.nameconn].Doctor = doctor(mongoose);
    db[c.nameconn].Patient = patient(mongoose);
    db[c.nameconn].Quote = quote(mongoose);
    db[c.nameconn].Admin = admin(mongoose);
  });
  exports.db = db;
  setUpCloudinary();
  magic.LogInfo('Conectado a la base de datos');
} else {
  magic.LogDanger('No existe la base de datos');
}