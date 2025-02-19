const authRouter = require('./auth.routes');
const employeeRouter = require('./employee.routes');
const evaluationRouter = require('./evaluation.routes');
const feedbackRouter = require('./feedback.routes');
const reportRouter = require('./report.routes');

const configureRoutes = app => {
    app.use('/api/auth', authRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/evaluations', evaluationRouter);
    app.use('/api/feedback', feedbackRouter);
    app.use('/api/reports', reportRouter);
}

module.exports = configureRoutes;