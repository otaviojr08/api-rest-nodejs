const database = require('../database/index');

const Product = database.connection.define('product', {
    name: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: database.Sequelize.FLOAT,
        allowNull: false
    }
});

Product.sync({force: false});

module.exports = Product;