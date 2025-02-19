const express = require('express');
const router = express.Router();

/* Controllers */
const { getEvaluationById, createEvaluation, updateEvaluation, getEvaluationsByEmployeeId } = require('../controllers/evaluation.controller');

/** Middlewares */
const { verifyRole, verifyToken } = require('../middlewares/auth');
const { evaluationValidator } = require('../middlewares/validators');

router.get('/:id', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), getEvaluationById);
router.post('/',   verifyToken, verifyRole('Admin', 'Manager'), evaluationValidator, createEvaluation);
router.put('/:id', verifyToken, verifyRole('Admin'), updateEvaluation);
router.get('/employee/:id', verifyToken, verifyRole('Admin', 'Manager', 'Employee'), getEvaluationsByEmployeeId);

module.exports = router;