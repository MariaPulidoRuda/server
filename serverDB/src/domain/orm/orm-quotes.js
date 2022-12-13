const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetQuotes = async (req, res, next) => {
    try {
      return await conn.db.connMongo.Quote.find();
    } catch (error) {
      magic.LogDanger('Cannot get all quotes', error);
      return await { err: { code: 123, message: error } };
    }
  };
  

  exports.GetQuote = async (id) => {
    try {
       
      return await conn.db.connMongo.Quote.findById(id);
    } catch (error) {
      magic.LogDanger('Cannot get this Patient', error);
      return await { err: { code: 123, message: error } };
    }
  };
  



exports.PostQuote = async (name, date, reason, doctor) => { 
    try {
      const data = await new conn.db.connMongo.Quote({
        name: name,
        date: date,
        reason: reason,
        doctor: doctor,
      });
   

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create a quote', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.DeleteQuote = async (id) => {
    try {

        return await conn.db.connMongo.Quote.deleteOne({ _id: id });
    } catch (error) {
        magic.LogDanger('Cannot delete that quote', error);
        return await { err: { code: 123, message: error } };
    }
  };



  exports.UpdateQuote = async (id, quote) => {
    try {
      return await conn.db.connMongo.Quote.findByIdAndUpdate(id, quote);
    } catch (error) {
      magic.LogDanger('Cannot Update quote', error);
      return await { err: { code: 123, message: error } };
    }
  };
  
  
  

