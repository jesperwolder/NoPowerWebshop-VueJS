let axios = require('axios');
const server1 = "http://server.topper144p.com:3001"
const GetAllProductsURL = server1 + '/all';

//products

export const GetAllProductsBody = async(jwt) =>{
    let err, response = await axios.get(GetAllProductsURL, {headers: {jwt: jwt }});

    if(err) throw err;

    return response.data;

}
