
let ObjectHasNoNull = (obj) => {
    for (let key in obj) {
        if(obj[key] == null || obj[key] == "") return false;
    }
    return true;
}

module.exports = { ObjectHasNoNull: ObjectHasNoNull }