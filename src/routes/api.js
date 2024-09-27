const express = require('express');
const db = require('../db.js');

const router = express.Router();

// paths

router.get('/helloJSON', (req, res) => {
  res.json({
    message: 'Hello there!',
  });
});

router.get('/timeJSON', (req, res) => {
  res.json({
    time: db.getTimeString(),
  });
});

// exports

module.exports = router;
