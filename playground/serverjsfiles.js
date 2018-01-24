//
// // var newTodo =  new Todo({
// //   text : 'Buy Milk'
// // });
//
// var newTodo = new Todo({
//   text : 'Something '
//   // text: 'Go for lecture',
//   // completed : false,
//   // completedAt: 1220
// });
//
// newTodo.save().then((res) => {
//   console.log('The new todo is', res);
// }, (e) => {
//   console.log('Unable to save the new todo');
// });



var user = new User({
  email : '    aditya@gmail.com'
});

user.save().then((res) => {
  console.log('User saved', res);
}, (e) =>{
  console.log('Unable to save the user', e);
});
