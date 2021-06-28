const express = require('express');
const app = express();

app.listen(8080, error => {
    if(error)
        console.log(`Error starting server: ${error}`);
    else
        console.log('Server started');
});