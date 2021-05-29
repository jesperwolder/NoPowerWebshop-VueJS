let Order = require('../Schema/OrderSchema');
let fetcher = require('../modules/Fetcher');
let mongoose = require('mongoose');

/**
 * @param {Array} ProductIDs Array of product IDS
 * @param {string} Jwt Jwt used for authentication
 */
let Execute = async (ProductIDs, Jwt) => {
    if(!ProductIDs || ProductIDs.length == 0) throw { msg:  'No products was given', code: 420 };
    
    let order = new Order();
    order.TotalPrice = 0;

    let failed = false;

    ProductIDs.forEach( async (ID) => {
        // needs update with /products/id,id,id
        let product = await fetcher.GetProductByID(ID);
        console.log(product);

        let prod = {
            _id: product._id,
            Name: product.Name,
            Thumbnail: product.Thumbnail,
            Price: product.Price
        }

        order.Products.push(prod);
        order.TotalPrice = order.TotalPrice + product.Price;
    });

    if(failed) throw { msg: 'Et af produkterne eksistere ikke eller er ikke længere salgbar', code: 404 };

    order._id = mongoose.Types.ObjectId();

    let body = await fetcher.ValidateJwt(Jwt);
    if(!body) throw { msg: 'User was not found', code: 403 };

    order.Buyer._id = body.User._id;
    order.Buyer.Fullname = body.User.Fullname;
    order.Buyer.Email = body.User.Email;

    let today = new Date();
    order.DateOfDelivery = today.setDate(today.getDate() + 3);
    order.Status = "Under håndtering";

    console.log(order);
    order.save();

    return order;
}


module.exports =  { Execute: Execute };