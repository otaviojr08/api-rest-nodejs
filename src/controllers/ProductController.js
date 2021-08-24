const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticate = require('../midlewares/authenticate');

router.get('/', authenticate, async(req, res) => {
    try{
        const products = await Product.findAll();
        
        if(!products)
            throw 'There are no registered products';
        
        res.status(200).send(products);
    }catch(err){
        res.status(404).send({error: `Query failed: ${err}`});
    }
});

router.get('/:id', authenticate, async(req, res) => {
    let {id} = req.params;

    try{
        if(isNaN(id))
            throw 'ID is not number';

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

router.post('/', authenticate, async(req, res) => {
    let {name, description, price} = req.body;

    try{
        if(!name || !description || !price)
            throw 'There are empty fields'; 

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

router.delete('/:id', authenticate, async(req, res) => {
    let {id} = req.params;

    try{
        if(isNaN(id))
            throw 'ID is not number';
        
        const product = await Product.findOne({
            where: {id}
        });

        if(!product)
            throw 'Product not found';
        
        await Product.destroy({
            where: {id}
        });
        
        res.status(200).send(product);
    }catch(err){
        res.status(400).send({error: `Failed to delete: ${err}`});
    }
});

router.put('/:id', authenticate, async(req, res) => {
    let {id} = req.params;
    let {name, description, price} = req.body;
    try{
        if(isNaN(id))
            throw 'ID is not number';
        
        let product = await Product.findOne({
            where: {id}
        });

        if(!product)
            throw 'Product not found';

        await Product.update({
            name: (name) ? name : product.name,
            description: (description) ? description : product.description,
            price: (price) ? price : product.price
        },{
            where: {id}
        });
        
        res.status(200).send(req.body);

    }catch(err){
        res.status(400).send({error: `Failed to update: ${err}`});
    }
});

module.exports = router;