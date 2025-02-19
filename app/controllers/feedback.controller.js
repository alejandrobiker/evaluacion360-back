const Feedback = require('../models/Feedback');

module.exports = {
    
    //  Enviar feedback para una evaluacion 
    createFeedback: async (req, res) => {
        try {
            const { evaluationId, userId, comments } = req.body;
    
            const newFeedback = new Feedback({
                evaluationId,
                userId,
                comments
            });
    
            await newFeedback.save();
    
            res.status(201).json({ message: 'Feedback enviado con éxito', feedback: newFeedback });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

}