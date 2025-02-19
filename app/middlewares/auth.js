const jwt = require('jsonwebtoken');

module.exports = {

    verifyToken: (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });

        try {
            const verified = jwt.verify(token, process.env.SECRET_KEY);
            req.user = verified;
            next();
        } catch (error) {
            res.status(400).json({ message: 'Token no válido.' });
        }
    },

    verifyRole: (...roles) => {
        return (req, res, next) => {
            if (!req.user || !req.user.user || !roles.includes(req.user.user.role)) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permisos para realizar esta acción.' });
            }
            next();
        };
    }

};
