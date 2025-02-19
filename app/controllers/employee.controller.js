const Employee = require('../models/Employee');

module.exports = {
    getEmployees: async (req, res) => {
        try {
            const employees = await Employee.find();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    createEmployee: async (req, res) => {
        try {
            const { name, email, position, department } = req.body;
    
            // Verificar si el email ya existe
            const existingEmail = await Employee.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'El empleado ya existe con ese correo.' });
            }
    
            // Crear un nuevo empleado
            const newEmployee = new Employee({ 
                name, 
                email, 
                position,
                department 
            });
            await newEmployee.save();
    
            res.status(201).json({ message: 'Empleado registrado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

}