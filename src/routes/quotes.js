const express = require('express');
const db = require('../db.js');

const router = express.Router();

const data = db.getAllQuotes();

// paths

router.get('/', (req, res) => {
  const { id } = req.query;
  // console.log(`id=${id}`);

  res.json(db.getQuoteById(id));
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote(data));
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote(data));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // console.log(`id=${id}`);

  res.json(db.getQuoteById(id));
});

// exports

module.exports = router;
