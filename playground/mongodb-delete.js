// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID(); // can generate an _id object.

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    } // specifying a return here prevents the remaining code to be executed.
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // deleteMany
    db.collection('Todos').deleteMany({
        text: 'Eat lunch'
    }).then((deletedDocs) => {
        console.log(deletedDocs.result); // the result object shows the status of deletion as well as the number of documents deleted.
    });
    // deleteOne
    db.collection('Todos').deleteOne({
        text: 'Eat lunch'
    }).then((deletedDocs) => {
        console.log(deletedDocs.result); // Like deleteMany(), the result object shows the status of deletion as well as the number of documents deleted.
    });
    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({
        text: 'Eat lunch'
    }).then((deletedDocs) => {
        console.log(deletedDocs.value); // The value object is the object you have deleted.
    });


    client.close();
}); // in a production environment the URL of the database could be an URL to the Mlab or Heroku database where you are storing your data. MongoClient.connect(<url>, callback);