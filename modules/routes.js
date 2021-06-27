const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello User root!');
});
router.get('/info', (req, res) => {
  res.send('some user info!');
});
module.exports = router;
