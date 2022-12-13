const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetDoctors = async (req, res, next) => {
    try {
      return await conn.db.connMongo.Doctor.find();
    } catch (error) {
      magic.LogDanger('Cannot get all doctors', error);
      return await { err: { code: 123, message: error } };
    }
  };
  exports.GetDoctorName = async (name) => {
    try {
      return await conn.db.connMongo.Doctor.findOne({ name: name });

    } catch (error) {
      magic.LogDanger('Cannot get this doctor', error);
      return await { err: { code: 123, message: error } };
    }
  };
  
  exports.GetDoctor = async (id) => {
    try {
       
      return await conn.db.connMongo.Doctor.findById(id);
    } catch (error) {
      magic.LogDanger('Cannot get this Doctor', error);
      return await { err: { code: 123, message: error } };
    }
  };
  



exports.PostDoctor = async (name, speciality, ) => { //poner la imagen
    try {
      const data = await new conn.db.connMongo.Doctor({
        name: name,
        speciality: speciality,
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
    magic.LogDanger('Cannot Create a doctor', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.DeleteDoctor = async (id) => {
    try {
        /*const deletedDoctor = await conn.db.connMongo.Doctor.findById(id);
        if (deletedDoctor.newDoctorImage) {
            await deleteFile(deletedDoctor.newDoctorImage);
        }*/
        return await conn.db.connMongo.Doctor.deleteOne({ _id: id });
    } catch (error) {
        magic.LogDanger('Cannot delete the doctor', error);
        return await { err: { code: 123, message: error } };
    }
  };



  exports.Update = async (id, doctor) => {
    try {
      return await conn.db.connMongo.Doctor.findByIdAndUpdate(id, doctor);
    } catch (error) {
      magic.LogDanger('Cannot Update doctor', error);
      return await { err: { code: 123, message: error } };
    }
  };
  
  
  


  
 