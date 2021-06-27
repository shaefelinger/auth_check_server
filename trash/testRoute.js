const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello test root!');
});
router.get('/info', (req, res) => {
  res.send('some test info!');
});
module.exports = router;
