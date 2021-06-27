require('dotenv').config();

const express = require('express');
const app = express(); //creates express-app-object

const port = 3000; // use port 3000

const authRoute = require('./modules/authRoute.js');
const cookieRoute = require('./modules/cookieRoute.js');

const cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
// app.use(express.static(__dirname + '/public')); // public-foder

app.use('/auth', authRoute);
app.use('/cookies', cookieRoute);

// ==========================================================================
// Start Server
// ==========================================================================

app.listen(port, function () {
  console.log('=================================================');
  console.log(`>>> Server running and listening on port ${port} <<<`);
  console.log('=================================================');
});
