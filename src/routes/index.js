const express = require('express');

const router = express.Router();

// paths

router.get('/', (req, res) => {
  res.send('Hello world!');
});

router.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

// exports

module.exports = router;
