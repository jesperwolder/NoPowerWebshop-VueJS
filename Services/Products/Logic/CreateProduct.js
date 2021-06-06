const validator = require('../modules/Validator.js');
const Fetcher = require('../modules/Fetcher');

const Repository = require('../Repository/Product');

/**
 * 
 * @param {string} jwt 
 * @param {string} Name 
 * @param {string} LowerHeader 
 * @param {string} Description 
 * @param {number} Price 
 * @param {string} Thumbnail url
 * @param {array} Images string[] with urls 
 * @param {number} Stock 
 * @param {array} Categories string[]
 * @param {array} TechnicalDetails [{ Header, Items: [ { Name, Value } ] }]
 * @returns 
 */
const Execute = async (jwt, Name, LowerHeader, Description, Price, SalePercentage, Thumbnail, Images, Stock, Categories, TechnicalDetails) => {
    let user = await Fetcher.FetchUser(jwt);
    if(!user.isAdmin) throw { msg: 'Du er ikke autoriseret til denne handling', code: 403 };

    // Changes to first letter to uppercase and the rest to lowercase
    let newCats = Categories;
    //Categories.forEach(Cat => {
    //    Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
    //    newCats.push(Cat);
    //});

    if(TechnicalDetails.length == 0) throw { msg: 'Der var ikke nogle tekniske detaljer', code: 401 };

    let failed = false;
    TechnicalDetails.forEach(detail => {
        // Checking if the 2 keys exists within the detail object
        if(!('Header' in detail) || !('Items' in detail)) {
            failed = true;
            return;
        }else {
            // checking if the required keys exists within items
            detail.Items.forEach(item => {
                if(!('Name' in item) || !('Value' in item)){
                    failed = true;
                    return;
                }
            });
            if(failed){
                return;
            }
        }
    });

    if(failed) throw { msg: 'Manglende værdier i tekniske detaljer', code: 422 };

    let product = Repository.Create(Name, Description, LowerHeader, Price, Stock, SalePercentage, Thumbnail, Images, newCats, TechnicalDetails);

    return product;
}

module.exports = { Execute: Execute }