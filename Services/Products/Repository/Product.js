const Product = require('../Schema/Product');
const mongoose = require('mongoose');

/**
 * 
 * @param {string} Name 
 * @param {string} Description 
 * @param {string} LowerHeader 
 * @param {number} Price 
 * @param {number} Stock 
 * @param {number} SalePercentage 
 * @param {string} Thumbnail url
 * @param {array} Images string[] with urls
 * @param {array} Categories string[]
 * @param {array} TechnicalDetails [{ Header, Items: [ { Name, Value } ] }]
 * @returns 
 */
const Create = (Name, Description, LowerHeader, Price, Stock, SalePercentage, Thumbnail, Images, Categories, TechnicalDetails) => {
    let product = new Product();
    product._id = mongoose.Types.ObjectId();
    product.Name = Name;
    product.Description = Description;
    product.LowerHeader = LowerHeader;
    product.Price = Price;
    product.Stock = Stock;
    product.SalePercentage = SalePercentage;
    product.Thumbnail = Thumbnail;
    product.Images = Images;
    product.Categories = Categories;
    product.TechnicalDetails = TechnicalDetails;

    SaveProduct(product);

    return product;
}

/**
 * 
 * @param {string} ProductID 
 * @returns {product} product
 */
const GetProductById = async (ProductID) => {
    let err, product = await Product.findById(ProductID);

    if(err) throw { msg: 'Der skete en fejl, prøv igen senere', code: 404 };
    if(!product) throw { msg: 'Kunne ikke finde noget produkt', code: 404 };

    return product;
}

/**
 * 
 * @param {object} param objecy of param
 * @param {number} skip
 * @param {number} limit
 * @returns 
 */
const GetProductsFromParam = async (param, skip, limit) => {
    let err, products = await Product.find(param).skip(skip).limit(parseInt(limit));
    if(err) throw { msg: 'Der skete en fejl prøv igen', code: 404 };
    if(!products) throw { msg: 'Der blev ikke fundet nogle produkter', code: 404 };

    return products;
}

/**
 * 
 * @param {object} Product product from schema to save 
 */
const SaveProduct = (Product) => {
    Product.save();
}

module.exports = {
    GetProductById: GetProductById,
    SaveProduct: SaveProduct,
    Create: Create,
    GetProductsFromParam: GetProductsFromParam
}