const PDFDocument = require('pdfkit');
const fs = require('fs');

const Evaluation = require('../models/Evaluation');
const Employee = require('../models/Employee');

const calculateEvaluationResults = require('../utils/calculateEvaluationResults');

module.exports = {
    
    //  Generar reporte de evaluación para un empleado
    generateEmployeeReport: async (req, res) => {
        try {
            const employeeId = req.params.id;

            // Obtener empleado
            const employee = await Employee.findById(employeeId);

            // Obtener todas las evaluaciones del empleado
            const evaluations = await Evaluation.find({ employeeId }).populate('employeeId');
    
            // Calcular el puntaje promedio y otra información relevante
            const results = calculateEvaluationResults(evaluations);
    
            // Crear un nuevo array de evaluaciones excluyendo el campo `employeeId`, evaluatorId, __v
            const evaluationsMap = evaluations.map((evaluation) => {
                const { employeeId, evaluatorId, __v, ...evaluationData } = evaluation.toObject();
                return evaluationData;
            });

            const report = {
                employee,
                totalEvaluations: results.totalEvaluations,
                averageScore: results.averageScore,
                evaluations: evaluationsMap
            };
    
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    generateEmployeeReportPDF: async (req, res) => {
        try {
            const employeeId = req.params.id;
    
            // Obtener empleado
            const employee = await Employee.findById(employeeId);

            // Obtener todas las evaluaciones del empleado
            const evaluations = await Evaluation.find({ employeeId }).populate('employeeId');
    
            // Calcular el puntaje promedio y otra información relevante
            const results = calculateEvaluationResults(evaluations);
            const totalScore = evaluations.reduce((acc, eval) => acc + eval.score, 0);
    
            // Crear el documento PDF
            const doc = new PDFDocument();
            const fileName = `report_${employeeId}.pdf`;
            const filePath = `./reports/${fileName}`;
    
            // Crear el directorio "reports" si no existe
            if (!fs.existsSync('./reports')) {
                fs.mkdirSync('./reports');
            }
            
            // Guardar el PDF en el sistema de archivos
            doc.pipe(fs.createWriteStream(filePath));
    
            // Contenido del PDF
            doc.fontSize(14).text('Reporte de Evaluación', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Nombre del Empleado: ${employee.name}`);
            doc.fontSize(12).text(`Total de Evaluaciones: ${results.totalEvaluations}`);
            doc.fontSize(12).text(`Promedio: ${results.averageScore.toFixed(2)}`);
            doc.moveDown();
    
            // Crear la tabla de evaluaciones
            doc.fontSize(12).text('Evaluaciones:', { align: 'center', underline: true });
            
            // Definir las posiciones de las columnas
            const tableTop = 200;
            const itemMargin = 30;
            const idX = 50;
            const scoreX = 200;
            const feedbackX = 300;
            const dateX = 450;

            // Cabecera de la tabla
            doc.text('ID de la Evaluación', idX, tableTop);
            doc.text('Puntaje', scoreX, tableTop);
            doc.text('Feedback', feedbackX, tableTop);
            doc.text('Fecha', dateX, tableTop);

            // Contenido de la tabla
            if (evaluations) {
                evaluations.forEach((evaluation, index) => {
                    const y = tableTop + itemMargin * (index + 1);
                    doc.fontSize(10).text(evaluation._id.toString(), idX, y);
                    doc.text(evaluation.score, scoreX, y);
                    doc.text(evaluation.feedback, feedbackX, y);
                    doc.text(new Date(evaluation.date).toLocaleString(), dateX, y);
                });
            }
            doc.end();
    
            // Enviar el PDF al cliente
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al generar el PDF', error: err.message });
                }
                res.contentType("application/pdf");
                res.send(data);
            });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }

}