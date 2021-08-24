const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const jwtSecret = 'ok6232232sdasdw6f6aasddawdr3fmvláwo4zv';

let db = {
    user: [
        {
            id: 1,
            name: 'Otávio',
            email: 'otavio@otavio',
            password: '123456'
        },
        {
            id: 2,
            name: 'Maria',
            email: 'maria@maria',
            password: '123456'
        },
        {
            id: 3,
            name: 'Ana',
            email: 'ana@ana',
            password: '123456'
        }
    ]
};

router.post('/authenticate', (req, res) => {
    let {email, password} = req.body;

    if(email || password){

        let user = db.user.find(user => user.email == email && user.password == password);

        if(!user)
            res.status(400).json({error: `Invalid fields`});

        //gera o token
        jwt.sign({id: user.id, email}, jwtSecret, {expiresIn: '48h'}, (error, token) => {
            if(error)
                res.status(403).json({error: 'Internal error'});
            
            res.status(200).json({token});
        });  

    }else
        res.status(400).json({error: `Failed request: Empty fields`});
});

module.exports = router;