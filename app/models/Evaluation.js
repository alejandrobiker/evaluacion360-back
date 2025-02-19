const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    score: { type: Number, required: true },
    feedback: { type: String }
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);