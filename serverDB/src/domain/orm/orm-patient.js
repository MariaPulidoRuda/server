const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetPatients = async (req, res, next) => {
    try {
      return await conn.db.connMongo.Patient.find();
    } catch (error) {
      magic.LogDanger('Cannot get all patients', error);
      return await { err: { code: 123, message: error } };
    }
  };
  exports.GetPatientName = async (name) => {
    try {
      return await conn.db.connMongo.Patient.findOne({ name: name });

    } catch (error) {
      magic.LogDanger('Cannot get this patient', error);
      return await { err: { code: 123, message: error } };
    }
  };

  
  exports.GetPatient = async (id) => {
    try {
       
      return await conn.db.connMongo.Patient.findById(id);
    } catch (error) {
      magic.LogDanger('Cannot get this Patient', error);
      return await { err: { code: 123, message: error } };
    }
  };
  



exports.PostPatient = async (name, age, weight, height, quotes) => { //poner la imagen
    try {
      const data = await new conn.db.connMongo.Patient({
        name: name,
        age: age,
        weight: weight,
        height: height,
        quotes: quotes,
      //poner la imagen
      });
   
      /*if (req.file) {
        data.doctorImage = req.file.path;
      } else {
        data.doctorImage = "there's no image";
      }*/

    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create a patient', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.DeletePatient = async (id) => {
    try {
        /*const deletedDoctor = await conn.db.connMongo.Doctor.findById(id);
        if (deletedDoctor.newDoctorImage) {
            await deleteFile(deletedDoctor.newDoctorImage);
        }*/
        return await conn.db.connMongo.Patient.deleteOne({ _id: id });
    } catch (error) {
        magic.LogDanger('Cannot delete the doctor', error);
        return await { err: { code: 123, message: error } };
    }
  };



  exports.UpdatePatient = async (id, patient) => {
    try {
      return await conn.db.connMongo.Patient.findByIdAndUpdate(id, patient);
    } catch (error) {
      magic.LogDanger('Cannot Update patient', error);
      return await { err: { code: 123, message: error } };
    }
  };
  
  
  

