const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormPatient = require('../orm/orm-patient');
//const { deleteFile } = require('../../middlewares/delete-file');


// plurar

exports.GetPatients = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let respOrm = await ormPatient.GetPatients();
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success get all patients'),
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

//por nombre

exports.GetPatientName = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { name } = req.params;
    let respOrm = await ormPatient.GetPatientName(name);
    console.log(respOrm);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the patient'),
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

//por id 

exports.GetPatient = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
   
    const { id } = req.params;
    
    let respOrm = await ormPatient.GetPatient(id);
    
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the patient'),
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


//crear paciente 

exports.PostPatient = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const name = req.body.name;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    //const quotes = req.body.quotes;
    //const image = req.body.image;
    if (name && age && weight && height) { //poner la imagen 
      let respOrm = await ormPatient.PostPatient(name, age, weight, height);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Patient created'), (statuscode = enum_.CODE_CREATED);
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

//borrar paciente

exports.DeletePatient = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
  
      if (id) {
        let respOrm = await ormPatient.DeletePatient(id);
        console.log(respOrm);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Patient deleted'), (statuscode = enum_.CODE_OK), (data=respOrm);
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
  
  //modificar 

  exports.UpdatePatient = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
      const updatedPatient = {
        name: req.body.name,
         age: req.body.age,
         weight: req.body.weight,
         height: req.body.height,
         quotes: req.body.quotes,
        //image: req.body.author,
      };
      if (id && updatedPatient) { //poner la imagen 
        let respOrm = await ormPatient.UpdatePatient(id, updatedPatient);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Patient updated'), (statuscode = enum_.CODE_OK);
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
  

  