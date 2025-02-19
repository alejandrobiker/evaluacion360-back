const { body, validationResult } = require('express-validator');

// Validadores para el registro de usuarios
exports.registerAuthValidator = [
    body('username').notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('Debe ser un correo válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('role').isIn(['Admin', 'Manager', 'Employee']).withMessage('El rol no es válido.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validadores para el registro de usuarios
exports.employeeValidator = [
    body('name').notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('Debe ser un correo válido.'),
    body('position').notEmpty().withMessage('La posición es obligatoria.'),
    body('department').notEmpty().withMessage('El departamento es obligatorio.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validadores para la creación de evaluaciones
exports.evaluationValidator = [
    body('employeeId').notEmpty().withMessage('El ID del empleado es obligatorio.'),
    body('evaluatorId').notEmpty().withMessage('El ID del evaluador es obligatorio.'),
    body('score').isInt({ min: 0, max: 100 }).withMessage('El puntaje debe ser un número entre 0 y 100.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validadores para el feedback
exports.feedbackValidator = [
    body('evaluationId').notEmpty().withMessage('El ID de la evaluación es obligatorio.'),
    body('userId').notEmpty().withMessage('El ID del usuario es obligatorio.'),
    body('comments').notEmpty().withMessage('Los comentarios son obligatorios.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
