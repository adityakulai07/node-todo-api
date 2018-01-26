const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//The methods below will return the todo which was removed
//unlike the method above
//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a6b53e2681ee8e179c90d6d').then((todo) => {
  console.log(todo);
});
