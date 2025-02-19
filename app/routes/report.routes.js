const express = require('express');
const router = express.Router();

/* Controllers */
const { generateEmployeeReport, generateEmployeeReportPDF } = require('../controllers/report.controller');

/** Middlewares */
const { verifyRole, verifyToken } = require('../middlewares/auth');

router.get('/employee/list/:id', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), generateEmployeeReport);
router.get('/employee/:id', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), generateEmployeeReportPDF);

module.exports = router;