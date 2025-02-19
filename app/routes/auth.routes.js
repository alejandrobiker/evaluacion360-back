const express = require('express');
const router = express.Router();

/* Controllers */
const { registerUser, loginUser } = require('../controllers/auth.controller');

/** Middlewares */
const { registerAuthValidator } = require('../middlewares/validators');

router.post('/register', registerAuthValidator, registerUser);
router.post('/login', loginUser);

module.exports = router;