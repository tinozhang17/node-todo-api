// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID(); // can generate an _id object.

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    } // specifying a return here prevents the remaining code to be executed.
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').find({
        _id: new ObjectID("5b4e0acf07650b699ce9bbc3") // you have to do new ObjectID instead of just passing in the string, because _id is an object, not a string.
    }).toArray().then((documents) => {
        console.log(`Todos:\n${JSON.stringify(documents, undefined, 2)}`);
    }, (err) => {
        console.log('Unable to fetch.')
    });

    db.collection('Todos').find({
        _id: new ObjectID("5b4e0acf07650b699ce9bbc3") // you have to do new ObjectID instead of just passing in the string, because _id is an object, not a string.
    }).count((err, count) => {
        if (err) {
            return console.log('Unable to count.')
        }
        console.log(`There are ${count} documents.`);
    }); // this is a different way of handling the return value from a cursor's method. Notice this is using a callback function to handle the the return value, instead of using the .then() Pormise syntax previously. Both would work.

    client.close();
}); // in a production environment the URL of the database could be an URL to the Mlab or Heroku database where you are storing your data. MongoClient.connect(<url>, callback);