require('./config/config.js');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');
//serverjs file only be focussed for express routes

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//post route
app.post('/todos', (req,res) => {
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

//get route (all)
app.get('/todos' , (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/636273264
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //pass queries
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(400).send();
  });


});

//DELETE /todos/3526532
app.delete('/todos/:id' , (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //pass queries
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//UPDATE /todos/62513743
app.patch('/todos/:id' , (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  //pass queries
  Todo.findByIdAndUpdate(id, {$set : body}, {new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });


});

//POST /users

app.post('/users', (req,res) => {

  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token) => {
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// POST /users/login {email,password}

app.post('/users/login' , (req, res) => {
  var body = _.pick(req.body,['email','password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    //res.send(user);
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })

});

//check added Middleware authenticate
app.get('/users/me' , authenticate, (req, res) => {
  res.send(req.user);
});

//Logout user - delete token
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}!`);
});

module.exports = {app};
