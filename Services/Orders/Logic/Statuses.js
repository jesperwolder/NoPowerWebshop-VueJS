let Fetcher = require('../modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

/**
 * 
 * @param {string} jwt 
 * @returns {string[]}
 */
const Execute = async (jwt) => {
    let user = await Fetcher.FetchUser(jwt);
    if(!user.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    return [
        "Under håndtering",
        "Afventer pickup",
        "På vej",
        "Leveret",
        "Fejl",
        "Afbrudt"
    ];
}

module.exports = { Execute: Execute }