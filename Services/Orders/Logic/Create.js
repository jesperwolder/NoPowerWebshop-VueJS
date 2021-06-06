const Repository = require('../Repository/Order');

const Fetcher = require('../modules/Fetcher');

/**
 * 
 * @param {string} jwt 
 * @param {array} products 
 * @param {string} fullname 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} address 
 */
async function Execute(jwt, products, fullname, email, phone, address) {
    let Fullname;
    let Email;
    let Phone;
    let Address;
    let UserID;

    if(jwt){
        let user = await Fetcher.FetchUser(jwt);
        UserID = user._id;
        Fullname = user.Fullname;
        Email = user.Email;
        Phone = user.Phone;
        Address = user.Address.Street +
            " " + user.Address.Number +
            ", " + user.Address.Zip +
            " " + user.Address.City;
    }else {
        UserID = null;
        Fullname = fullname;
        Email = email;
        Phone = phone;
        Address = address;
    }

    let orderProds = [];
    for(i = 0; i < products.length; i++) {
        let product = await Fetcher.GetProductByID(products[i]._id);
        
        if(product.Stock < products[i]) throw { msg: 'Der var ikke nok på lager', code: 409 };

        product[0].Stock = product[0].Stock - products[i].Quantity;
        
        let updated = await Fetcher.UpdateProduct(product[0]);
        console.log(updated);

        orderProds.push({
            _id: product[0]._id,
            Name: product[0].Name,
            Price: product[0].Price, 
            SalePercentage: product[0].SalePercentage, 
            Thumbnail: product[0].Thumbnail, 
            Quantity: products[i].Quantity
        });
    }

    let order = await Repository.CreateOrder(orderProds, UserID, Fullname, Email, Phone, Address);

    return order;
}

module.exports = { Execute: Execute }