const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
require('./config/config');

require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id,
  }).then((todos) => {
    res.send({ todos });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
  });
  todo.save((err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(result);
  });
});

// GET /todos/123456
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id,
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }, () => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  // get the id
  const id = req.params.id;
  // validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id,
    });
    if (!todo) {
      return res.status(404).send();
    }
    return res.send({ todo });
  } catch (e) {
    return res.status(400).send();
  }
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

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
  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(() => res.status(400).send());
});

// POST /users
app.post('/users', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  try {
    await user.save();
    const token = user.generateAuthToken();
    return res.header('x-auth', token).send(user); // when you tack on an "x-" before a header, you are creating a custom header, which means it's not necessarily a header that HTTP supports by default. In our example, we are using a jwt token scheme, so we are creating a custom header to store that value.
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    return res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token); // we don't care about the return value here, as long as it resolves. If it rejects, then the catch block will run.
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };
