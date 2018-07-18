// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID(); // can generate an _id object.

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    } // specifying a return here prevents the remaining code to be executed.
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate(filter={
        text: 'Eat lunch'
    }, update={
        $set: {
            completed: true
        } // You have to define the update operator. Here we define it as $set. You can find more operators like $set in the mongodb documentation.
    }, options={
        returnOriginal: false
    }, callback=(err, result) => {
        if (err) {
            return console.log('Unable to update.', err);
        }
        console.log(result.value);
    });

    db.collection('Users').findOneAndUpdate({
        name: 'Tino Zhang'
    }, {
        $set: {
            name: 'Tino Zhang'
        },
        $inc: {
            age: 1 // increment age by 1
        }
    }, {
        returnOriginal: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to update.', err);
        }
        console.log(result.value);
    });


    client.close();
}); // in a production environment the URL of the database could be an URL to the Mlab or Heroku database where you are storing your data. MongoClient.connect(<url>, callback);