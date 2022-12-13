const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormQuote = require('../orm/orm-quotes');



// plurar

exports.GetQuotes = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    let respOrm = await ormQuote.GetQuotes();
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success get all quotes'),
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


//por id 

exports.GetQuote = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
   
    const { id } = req.params;
    
    let respOrm = await ormQuote.GetQuote(id);
    
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


//crear cita

exports.PostQuote = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const name = req.body.name;
    const date = req.body.date;
    const reason = req.body.reason;
    const doctor = req.body.doctor;
    
    if (name && date && reason && doctor) { 
      let respOrm = await ormQuote.PostQuote(name, date, reason, doctor);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'Quote created'), (statuscode = enum_.CODE_CREATED);
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

//borrar cita

exports.DeleteQuote = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
  
      if (id) {
        let respOrm = await ormQuote.DeleteQuote(id);
        console.log(respOrm);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Quote deleted'), (statuscode = enum_.CODE_OK), (data=respOrm);
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

  exports.UpdateQuote = async (req, res) => {
    let status = 'Success',
      errorcode = '',
      message = '',
      data = '',
      statuscode = 0,
      response = {};
    try {
      const { id } = req.params;
      const updatedQuote = {
        name: req.body.name,
        date: req.body.date,
    reason: req.body.reason,
    doctor: req.body.doctor,
        
      };
      if (id && updatedQuote) { 
        let respOrm = await ormQuote.UpdateQuote(id, updatedQuote);
        if (respOrm.err) {
          (status = 'Failure'),
            (errorcode = respOrm.err.code),
            (message = respOrm.err.messsage),
            (statuscode = enum_.CODE_BAD_REQUEST);
        } else {
          (message = 'Quote updated'), (statuscode = enum_.CODE_OK);
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
  
