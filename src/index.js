const express = require('express');
const app = express();
const database = require('./database/index');
const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

database.connection.authenticate()
    .then(() => console.log('Database conected'))
    .catch(error => console.log(`Database connection error: ${error}`));

app.use('/product', ProductController);
app.use('/user', UserController);

app.listen(8080, error => {
    if(error)
        console.log(`Error starting server: ${error}`);
    else
        console.log('Server started');
});