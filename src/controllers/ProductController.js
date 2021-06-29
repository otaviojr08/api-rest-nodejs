const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async(req, res) => {
    try{
        const products = await Product.findAll();
        
        if(!products)
            throw 'There are no registered products';
        
        res.status(200).send(products);
    }catch(err){
        res.status(404).send({error: `Query failed: ${err}`});
    }
});

router.get('/:id', async(req, res) => {
    let {id} = req.params;

    try{
        if(isNaN(id))
            throw 'Id is not number';

        const product = await Product.findOne({
            where: {id}
        });

        if(!product)
            throw 'Product not found';

        res.status(200).send(product);
    }catch(err){    
        res.status(404).send({error: `Query failed: ${err}`});
    }
});

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