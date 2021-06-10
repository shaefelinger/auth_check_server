require('dotenv').config();

const express = require('express');
const app = express(); //creates express-app-object

app.use(express.json());
const cors = require('cors');

// app.use(express.static(__dirname + '/public')); // public-foder

const port = 3000; // use port 3000

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

const bcrypt = require('bcrypt');
const saltRounds = 11;

// Mongoose
// ==========================================================================
const mongoose = require('mongoose');

const url =
  'mongodb+srv://dbUser:' +
  process.env.MONGO_PW +
  '@cluster0.dq3y7.mongodb.net/' +
  process.env.MONGO_DB;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error('😱Connection to MongoDB went wrong : ' + err);
  });
// ==========================================================================

// ==========================================================================
app.get('/', function (req, res) {
  console.log('A request was made to the root');
  res.send('A request was made to the root');
});

// Users
// ==========================================================================

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic: String,
});

const User = mongoose.model('User', userSchema);

///////////////////// List of ALL users
app.route('/users').get((req, res) => {
  User.find((err, foundUsers) => {
    console.log('GET all Users');
    if (!err) {
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
});

// register
// ==========================================================================

app.post('/register', (req, res) => {
  console.log('👍register');
  User.findOne({ email: req.body.email }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log('user exists');
        res.send('user exists');
      } else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          const newUser = new User(req.body);
          newUser.password = hash;
          newUser.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.send({
                user: {
                  email: newUser.email,
                  name: newUser.name,
                },
                token: 'registered',
              });
              console.log('👍success');
            }
          });
        });
      }
    }
  });
});

// login
// ==========================================================================

app.post('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function (err, foundUser) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (foundUser) {
        console.log('found user', foundUser);
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result) {
            res.send({
              user: {
                email: foundUser.email,
                name: foundUser.name,
              },
              token: 'loggedIn',
            });
          } else {
            res.send('wrong password');
          }
        });
      } else {
        res.send('wrong user ');
      }
    }
  });
});

// ==========================================================================
// Start Server
// ==========================================================================

app.listen(port, function () {
  console.log('=================================================');
  console.log(`>>> Server running and listening on port ${port} <<<`);
  console.log('=================================================');
});
