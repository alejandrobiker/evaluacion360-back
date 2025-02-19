const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    evaluationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);