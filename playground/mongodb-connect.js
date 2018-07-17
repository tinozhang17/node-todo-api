// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID(); // can generate an _id object.

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    } // specifying a return here prevents the remaining code to be executed.
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo ', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops stores the documents we inserted.
        console.log(result.ops[0]._id.getTimestamp());
    });
    client.close();
}); // in a production environment the URL of the database could be an URL to the Mlab or Heroku database where you are storing your data. MongoClient.connect(<url>, callback);