const jwtService = require('../services/jwtService');

module.exports = (req,res,next) =>{
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({message: 'Token não enviado'});

    const token = header.split(" ")[1];

    try {
        const decoded = jwtService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token Inválido' });
    }

};

