const Users = require('../Schema/UserInfo')

const CreateIndex = () => {
    console.log("Creating indexes");
    Users.createIndexes({ _id: 1 });
}

module.exports = { CreateIndex: CreateIndex }