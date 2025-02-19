const calculateEvaluationResults = (evaluations) => {
    const totalScore = evaluations.reduce((acc, eval) => acc + eval.score, 0);
    const averageScore = evaluations.length ? totalScore / evaluations.length : 0;

    return {
        totalEvaluations: evaluations.length,
        averageScore
    };
};

module.exports = calculateEvaluationResults;