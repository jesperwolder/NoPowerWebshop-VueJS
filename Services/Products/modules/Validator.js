
let ObjectHasNoNull = (obj) => {
    for (let key in obj) {
        if(obj[key] == null || obj[key] == "") {
            console.log(key + " is null");
            return false;
        }
    }
    return true;
}

module.exports = { ObjectHasNoNull: ObjectHasNoNull }