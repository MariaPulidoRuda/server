const express = require("express");
const router = express.Router();
const doctors = require('../domain/services/service-doctor')
const patients = require('../domain/services/services-patient')
const quotes = require('../domain/services/service-quote')
const admins = require('../domain/services/service-admin')
//const { isAuth } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');
//const { upload } = require('../middlewares/file');

//poner las demás rutas de pacientes citas y admin


//DOCTORS
router.get('/doctors', doctors.GetDoctors); //correcto
router.get('/doctors/:id', doctors.GetDoctor); //correcto
router.get('/doctors/doctor/:name', doctors.GetDoctorName); //correcto
router.post('/doctors', doctors.PostDoctor); //correcto
router.patch('/doctors/:id', doctors.Update); //correcto //falta meter la función para modificar la imagen
router.delete('/doctors/:id', doctors.DeleteDoctor);

//PATIENTS
router.get('/patients', patients.GetPatients); // correcto
router.get('/patients/:id', patients.GetPatient); // correcto
router.get('/patients/patient/:name', patients.GetPatientName); //  correcto 
router.post('/patients', patients.PostPatient); //correcto (hay que poner fecha de cita para crear paciente)
router.patch('/patients/:id', patients.UpdatePatient); // correcto 

router.delete('/patients/:id', patients.DeletePatient); //correcto


//citas
router.get('/quotes', quotes.GetQuotes); //correcto 
router.get('/quotes/:id', quotes.GetQuote); //correcto
router.post('/quotes', quotes.PostQuote); //correcto 
router.patch('/quotes/:id', quotes.UpdateQuote); //
router.delete('/quotes/:id', quotes.DeleteQuote); //


//admin
router.get('/admins', [isAdmin], admins.Admins);
router.post('/admins/admin/login', admins.Login);
router.delete('/admins/:id', [isAdmin], admins.DeleteAdmin);
router.get('/admins/:id', [isAdmin], admins.Admin);
router.get('/admins/admin/:name', [isAdmin], admins.AdminName);


module.exports = router;






//PROBAR LAS RUTAS DE ADMIN

