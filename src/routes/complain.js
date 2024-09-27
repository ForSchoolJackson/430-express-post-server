const express = require('express');

const router = express.Router();

// paths

router.get('/cry', (req, res) => {
  res.send('WAHHHHH!');
});

router.get('/whine', (req, res) => {
  res.send('I want ice cream!');
});

module.exports = router;
