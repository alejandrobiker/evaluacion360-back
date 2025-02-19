const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
    
            // Verificar si el usuario ya existe
            const existingUserName = await User.findOne({ username });
            const existingEmail = await User.findOne({ email });
            if (existingUserName || existingEmail) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }
    
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Crear un nuevo usuario
            const newUser = new User({ 
                username, 
                email, 
                password: hashedPassword, 
                role 
            });
            await newUser.save();
    
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Verificar si el usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }
    
            // Verificar si la contraseña es correcta
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Crear un objeto usuario sin los campos _id, password y __v
            const { _id, password: _, __v, ...userWithoutSensitiveData } = user.toObject();

            // Crear y firmar el token JWT
            const token = jwt.sign({ user: userWithoutSensitiveData }, process.env.SECRET_KEY, {
                expiresIn: '1h'
            });
    
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: `Error en el servidor`, error: error.message });
        }
    },
}