const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set mongoose to use the built-in Promise library. There are other Promise libraries.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}); // mongoose will suspend processing the rest of the code until a connection is established. So you don't need to put in a callback like you do with mongoDB-native

module.exports = {mongoose};