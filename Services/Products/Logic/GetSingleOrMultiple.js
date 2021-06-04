const Repository = require('../Repository/Product');

/**
 * 
 * @param {string} ids ids seperated by , 
 * @returns {array} array containing products
 */
const Execute = async (ids) => {
    let prods = [];
    if(ids.includes(',')){
        let IDs = ids.split(',');

        for (id of IDs){
            let product = await Repository.GetProductById(id);
            prods.push(product);
        }
    }else {
        let product = await Repository.GetProductById(ids);
        prods.push(product);
    }

    return prods;
}

module.exports = { Execute: Execute }