const express = require('express');
const router = express.Router();

router.get('/places', (req, res) => {
  res.send('Places route1');
});

module.exports = router;
