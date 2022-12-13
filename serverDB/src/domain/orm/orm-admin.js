const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAdmins = async (req, res, next) => {
    try {
      return await conn.db.connMongo.Admin.find();
    } catch (error) {
      magic.LogDanger('Cannot get all admins', error);
      return await { err: { code: 123, message: error } };
    }
  };
exports.PostAdmin = async (
  AdminName,
  Password,
  req
) => {
  try {
    const data = await new conn.db.connMongo.Admin({
      name: AdminName,
      password: Password,
    });

    data.password = bcrypt.hashSync(data.password, 10);
    data.save();

    return true;
  } catch (error) {
    magic.LogDanger('Cannot Create admin', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.DeleteAdmin = async (id) => {
    try {
        /*const deletedDoctor = await conn.db.connMongo.Doctor.findById(id);
        if (deletedDoctor.newDoctorImage) {
            await deleteFile(deletedDoctor.newDoctorImage);
        }*/
        return await conn.db.connMongo.Admin.deleteOne({ _id: id });
    } catch (error) {
        magic.LogDanger('Cannot delete admin', error);
        return await { err: { code: 123, message: error } };
    }
  };

  exports.UpdateAdmin = async (id, admin) => {
    try {
      return await conn.db.connMongo.Admin.findByIdAndUpdate(id, admin);
    } catch (error) {
      magic.LogDanger('Cannot Update doctor', error);
      return await { err: { code: 123, message: error } };
    }
  };

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Admin.findById(id);
  } catch (error) {
    magic.LogDanger('Cannot get the admin by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.AdminByName = async (name) => {
  try {
    return await conn.db.connMongo.User.findOne({ name: name });
  } catch (error) {
    magic.LogDanger('Cannot get the admin by its name', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Login = async (adminName, req) => {
  try {
    const adminInfo = await conn.db.connMongo.Admin.findOne({
      adminname: adminName,
    });

    if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
      adminInfo.password = null;
      const token = jwt.sign(
        {
          id: adminInfo._id,
          name: adminInfo.name,
        
        },
        req.app.get('secretKey'),
        { expiresIn: '30h' }
      );
      return {
        user: userInfo,
        token: token,
      };
    } else {
      return console.log('Incorrect password');
    }
  } catch (error) {
    magic.LogDanger('Cannot log in the user', error);
    return await { err: { code: 123, message: error } };
  }
};