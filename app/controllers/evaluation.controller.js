const Evaluation = require('../models/Evaluation');
const calculateEvaluationResults = require('../utils/calculateEvaluationResults');

module.exports = {
    
    // Obtener detalles de una evaluación
    getEvaluationById: async (req, res) => {
        try {
            const evaluation = await Evaluation.findById(req.params.id).populate('employeeId evaluatorId');
            if (!evaluation) {
                return res.status(404).json({ message: 'Evaluación no encontrada' });
            }
            res.status(200).json(evaluation);
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    //  Crear una nueva evaluación
    createEvaluation: async (req, res) => {
        try {
            const { employeeId, evaluatorId, score, feedback } = req.body;
    
            const newEvaluation = new Evaluation({
                employeeId,
                evaluatorId,
                score,
                feedback
            });
    
            await newEvaluation.save();
    
            res.status(201).json({ message: 'Evaluación creada con éxito', evaluation: newEvaluation });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    // Actualizar una evaluación
    updateEvaluation: async (req, res) => {
        try {
            const { id } = req.params;
            const { score, feedback } = req.body;
    
            const updatedEvaluation = await Evaluation.findByIdAndUpdate(
                id,
                { score, feedback },
                { new: true, runValidators: true }
            );
    
            if (!updatedEvaluation) {
                return res.status(404).json({ message: 'Evaluación no encontrada' });
            }
    
            res.status(200).json({ message: 'Evaluación actualizada con éxito', evaluation: updatedEvaluation });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    //  Obtener evaluaciones de un empleado
    getEvaluationsByEmployeeId: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const evaluations = await Evaluation.find({ employeeId }).populate('employeeId evaluatorId');

            const results = calculateEvaluationResults(evaluations);
            res.status(200).json({
                employeeId,
                results,
                evaluations
            });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },
}
