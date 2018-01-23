//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj  = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {
  if(err){
    return console.log('Unable to connect to the Mongodb server');
  }
  console.log('Connected to the Mongodb server');

  // The 3 delete queries we will be focussing on are:

  //deleteMany
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // db.collection('Users').deleteMany({name:'Aditya'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text:'Eat'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text:'Eat'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id : new ObjectID("5a6416281839ffb20cd66e38")}).then((result) => {
    console.log(result);
  });
});
