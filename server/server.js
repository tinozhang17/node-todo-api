const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const PORT = process.env.PORT;

let app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save((err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(result);
    });
});

// GET /todos/123456
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    // get the id
    let id = req.params.id;
    // validate the id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // remove todo by id
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // findOneAndUpdate(id, update operators, options)
    // here, {new: true} means return the updated document, not the original document
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        return res.status(400).send();
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = {app};





