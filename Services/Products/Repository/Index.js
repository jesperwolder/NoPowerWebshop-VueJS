const Products = require('../Schema/Product')

const CreateIndex = () => {
    console.log("Creating indexes");
    Products.createIndexes({ Categories: 1 });
}

module.exports = { CreateIndex: CreateIndex }