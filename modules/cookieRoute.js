const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  console.log('home route');
  res.send(req.cookies);
  console.log('Cookies: ', req.cookies);
});

router.get('/set', function (req, res) {
  console.log('>>set route');
  res.cookie('loggedin', 'true');
  res.send('The server sent a cookie!');
  console.log('Cookies: ', req.cookies);
});

router.get('/read', (req, res) => {
  console.log('read route');
  let response = 'Not logged in!';
  if (req.cookies.loggedin == 'true') {
    response = 'Yup! You are logged in!';
  }
  res.send(response);
});

module.exports = router;
