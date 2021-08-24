const jwt = require('jsonwebtoken');
const jwtSecret = 'ok6232232sdasdw6f6aasddawdr3fmvláwo4zv';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    try{
        let decoded = jwt.verify(token, jwtSecret);

        req.userLogged = {
            id: decoded.id,
            email: decoded.email
        };
        
        next();
    }catch(error){
        res.status(401).json({error: 'Invalid Token'});
    }
}