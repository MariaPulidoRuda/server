const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormDoctor = require('../orm/orm-doctor');
//const { deleteFile } = require('../../middlewares/delete-file');


//doctores plurar

exports.GetDoctors = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let respOrm = await ormDoctor.GetDoctors();
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success get all doctors'),
        (data = respOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

//doctor por nombre

exports.GetDoctorName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { name } = req.params;
    let respOrm = await ormDoctor.GetDoctorName(name);
    console.log(respOrm);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the doctor'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

//doctor por id 

exports.GetDoctor = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    
    const { id } = req.params;
   
    let respOrm = await ormDoctor.GetDoctor(id);
    
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the doctor'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService(
      'Failure',
      enum_.CODE_BAD_REQUEST,
      error,
      ''
    );
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};


//crear doctor 

exports.PostDoctor = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const name = req.body.name;
    const speciality = req.body.speciality;
    //const image = req.body.image;
    if (name && speciality) { //poner la imagen 
      let respOrm = await ormDoctor.PostDoctor(name, speciality);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Doctor created'), (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'All fields are required'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

//borrar doctor

exports.DeleteDoctor = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
  
      if (id) {
        let respOrm = await ormDoctor.DeleteDoctor(id);
        console.log(respOrm);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Doctor deleted'), (statuscode = enum_.CODE_OK), (data=respOrm);
        }
      } else {
        (status = 'Failure'),
          (errorcode = enum_.ERROR_REQUIRED_FIELD), 
          (message = 'id does not exist'),
          (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
      }
      response = await magic.ResponseService(status, errorcode, message, data);
      return res.status(statuscode).send(response);
    } catch (err) {
      console.log('err = ', err);
      return res
        .status(enum_.CODE_INTERNAL_SERVER_ERROR)
        .send(
          await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
        );
    }
  };
  
  //modificar doctor 

  exports.Update = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
      const updatedDoctor = {
        name: req.body.name,
        speciality: req.body.speciality,
        //image: req.body.author,
      };
      if (id && updatedDoctor) {
        let respOrm = await ormDoctor.Update(id, updatedDoctor);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Doctor updated'), (statuscode = enum_.CODE_OK);
        }
      } else {
        (status = 'Failure'),
          (errorcode = enum_.ERROR_REQUIRED_FIELD),
          (message = 'id does not exist'),
          (statuscode = enum_.CODE_BAD_REQUEST);
      }
      response = await magic.ResponseService(status, errorcode, message, data);
      return res.status(statuscode).send(response);
    } catch (err) {
      console.log('err = ', err);
      return res
        .status(enum_.CODE_INTERNAL_SERVER_ERROR)
        .send(
          await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
        );
    }
  };
  

  