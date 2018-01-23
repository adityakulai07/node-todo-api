//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj  = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) => {
  if(err){
    return console.log('Unable to connect to the Mongodb server');
  }
  console.log('Connected to the Mongodb server');

  // //{completed : false}
  // db.collection('Todos').find({ _id : new ObjectID('5a6400b11839ffb20cd66c62')}).toArray().then((result) => {
  //   console.log('TODOS');
  //   console.log(JSON.stringify(result, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch the collection todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count is ${count}`);
  // } , (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name : 'Aditya'}).count().then((count) => {
    console.log(`The count of the user with the required name is ${count} .`);
  }, (err) => {
    console.log('Unable to fetch Users' , err);
  });

  db.collection('Users').find({name : 'Aditya'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));

    });
});
