const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async(req, res) => {
    let {name} = req.body;

    try{
        let product = await Product.findOne({
            where: {name}
        });

        if(product)
            throw 'Product already exists';

        product = await Product.create(req.body);
        res.status(200).send(product);
    }catch(err){
        res.status(400).send({error: `Creation failed: ${err}`});
    }
});

module.exports = router;