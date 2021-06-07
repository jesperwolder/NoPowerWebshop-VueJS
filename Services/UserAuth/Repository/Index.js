const Users = require('../Schema/UserInfo');

const CreateIndex = () => {
    console.log('Index is being created');
    Users.createIndexes({ _id : 1 });
}

module.exports = {
    CreateIndex : CreateIndex
}