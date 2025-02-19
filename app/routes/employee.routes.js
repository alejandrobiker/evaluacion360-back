const express = require('express');
const router = express.Router();

/* Controllers */
const { getEmployees, createEmployee } = require('../controllers/employee.controller');

/** Middlewares */
const { verifyRole, verifyToken } = require('../middlewares/auth');
const { employeeValidator } = require('../middlewares/validators');

router.get('/', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), getEmployees);
router.post('/', verifyToken, verifyRole('Admin', 'Manager'), employeeValidator, createEmployee);

module.exports = router;