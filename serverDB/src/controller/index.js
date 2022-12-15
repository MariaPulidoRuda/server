const express = require("express");
const router = express.Router();
const doctors = require('../domain/services/service-doctor')
const patients = require('../domain/services/services-patient')
const quotes = require('../domain/services/service-quote')
const admins = require('../domain/services/service-admin')
const { isAuth } = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/admin.middleware');





//DOCTORS
router.get('/doctors', doctors.GetDoctors); //correcto
router.get('/doctors/:id', doctors.GetDoctor); //correcto
router.get('/doctors/doctor/:name', doctors.GetDoctorName); //correcto
router.post('/doctors', [isAuth], doctors.PostDoctor); //correcto
router.patch('/doctors/:id', [isAuth], doctors.Update); //correcto //falta meter la función para modificar la imagen
router.delete('/doctors/:id',[isAuth], doctors.DeleteDoctor);

//PATIENTS
router.get('/patients', [isAuth], patients.GetPatients); // correcto
router.get('/patients/:id', [isAuth], patients.GetPatient); // correcto
router.get('/patients/patient/:name', [isAuth], patients.GetPatientName); //  correcto 
router.post('/patients', [isAuth], patients.PostPatient); //correcto (hay que poner fecha de cita para crear paciente)
router.patch('/patients/:id', [isAuth], patients.UpdatePatient); // correcto 

router.delete('/patients/:id', [isAuth], patients.DeletePatient); //correcto


//citas
router.get('/quotes', [isAuth], quotes.GetQuotes); //correcto 
router.get('/quotes/:id', [isAuth], quotes.GetQuote); //correcto
router.post('/quotes', [isAuth], quotes.PostQuote); //correcto 
router.patch('/quotes/:id', [isAuth], quotes.UpdateQuote); //
router.delete('/quotes/:id', [isAuth], quotes.DeleteQuote); //


//admin
router.get('/admins', [isAdmin], admins.GetAdmins); //traerlos todos //NO VA

router.post('/admins/admin/register', [isAdmin], admins.PostAdmin); //registrar COREECTO
router.post('/admins/admin/login', [isAdmin], admins.Login); //CORRECTO

router.delete('/admins/:id', [isAdmin], admins.DeleteAdmin); //eliminar
router.patch('/admins/:id', [isAdmin], admins.UpdateAdmin); //modificar

router.get('/admins/admin/id/:id', [isAdmin], admins.Admin); //traer por id NO VA
router.get('/admins/admin/:name', [isAdmin], admins.AdminName); //traer por nombre NO VA



//mirar lo del nombre

module.exports = router;




