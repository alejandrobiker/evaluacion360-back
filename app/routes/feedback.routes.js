const express = require('express');
const router = express.Router();

/* Controllers */
const { createFeedback } = require('../controllers/feedback.controller');

/** Middlewares */
const { verifyRole, verifyToken } = require('../middlewares/auth');
const { feedbackValidator } = require('../middlewares/validators');

router.post('/', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), feedbackValidator, createFeedback);

module.exports = router;