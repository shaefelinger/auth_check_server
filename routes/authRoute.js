const express = require('express');
const router = express.Router();

const User = require('../modules/db');

// router.get('/', (req, res) => {
//   res.send('>>Auth root!');
// });

const bcrypt = require('bcrypt');
const saltRounds = 10;

///////////////////// List of ALL users
router.get('/list', (req, res) => {
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

router.post('/register', (req, res) => {
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

router.post('/login', function (req, res) {
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

module.exports = router;
