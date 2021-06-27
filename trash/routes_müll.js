const express = require('express');
const app = express();

const routes = (req, res) => {
  app.get('/', function (req, res) {
    console.log('A request was made to the root');
    res.send('A request was made to the root');
  });
};

module.exports = routes;
