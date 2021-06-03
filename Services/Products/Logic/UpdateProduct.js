const Fetcher = require('../modules/Fetcher');
require('dotenv').config();

const Repository = require('../Repository/Product');

/**
 * 
 * @param {string} Jwt 
 * @param {string} ProductID 
 * @param {string} Name 
 * @param {string} LowerHeader 
 * @param {string} Description 
 * @param {number} Price 
 * @param {string} Thumbnail 
 * @param {array} Images 
 * @param {number} SalePercentage 
 * @param {number} Stock 
 * @param {array} TechnicalDetails 
 * @param {array} Categories 
 */
const Execute = async (Jwt, ProductID, Name, LowerHeader, Description, Price, Thumbnail, Images, SalePercentage, Stock, TechnicalDetails, Categories) => {
    let user = await Fetcher.FetchUser(Jwt);
    
    if(!user.isAdmin) throw { msg: 'Du er ikke autoriseret', code: 403 };

    let product = await Repository.GetProductById(ProductID);

    let newCats = [];
    Categories.forEach(Cat => {
        Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
        newCats.push(Cat);
    });

    try {
        // updating the values if the given new value is not null
        product.Name = (Name ? Name : product.Name);
        product.LowerHeader = (LowerHeader ? LowerHeader : product.LowerHeader );
        product.Description = (Description ? Description : product.Description);
        product.Price = (Price ? Price : product.Price);
        product.Thumbnail = (Thumbnail ? Thumbnail : product.Thumbnail);
        product.Images = (Images ? Images : product.Images);
        product.SalePercentage = (SalePercentage ? SalePercentage : product.SalePercentage);
        product.Stock =(Stock ? Stock : product.Stock);
        product.TechnicalDetails = (TechnicalDetails ? TechnicalDetails : product.TechnicalDetails);
        product.Categories = (newCats ? newCats : product.Categories);

        Repository.SaveProduct(product);
    }catch {
        throw { msg: 'Manglende værdier', code: 503 }
    }

    return product;
}

module.exports = { Execute: Execute }