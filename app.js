const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63ff4b32032368d7bf888857')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(()=> {
//   app.listen(3000);
// });

mongoose.connect('mongodb+srv://yatingoyal31:Yatinrock3@cluster0.byipqee.mongodb.net/shop?retryWrites=true&w=majority').then(result =>{
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'yatingoyal31',
        email:'gyati5@gmail.com',
        cart:{
          items:[]
        }
      });
      user.save();
    }

  });
  
  app.listen(3000);
})
.catch(error => {
  console.log(error);
});