const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = "5b4f874b4bf34239cc0c3aab";

if (!ObjectID.isValid(id)) {
    return console.log('ID not valid!');
}

Todo.find({
    _id: id // mongoose will automatically convert id into an MongoDB ID Object
}).then((todos) => {
    console.log('Todos', todos);
}); // find() will return an array of documents

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
}); // findOne() will return one document

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found!');
    }
    console.log('Todo By Id', todo);
}).catch((e) => console.log(e));