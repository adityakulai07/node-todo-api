//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj  = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {
  if(err){
    return console.log('Unable to connect to the Mongodb server');
  }
  console.log('Connected to the Mongodb server');

  //db.close();

//   db.collection('Todos').findOneAndUpdate({_id : new ObjectID("5a6400b11839ffb20cd66c62")},
// {
//   $set : {
//     completed : false
//   }
// }, {
//   returnOriginal : false
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({_id: new ObjectID("5a6720cd77aa3a5521cce9ea")},
{
  $set : {
    name : 'Raghunath'
  },
  $inc : {
    age : 1
  }
}, {
  returnOriginal: false
}).then((res) => {
  console.log(res);
});
});
