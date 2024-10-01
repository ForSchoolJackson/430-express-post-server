const express = require('express');
const db = require('../db.js');

const router = express.Router();

const hoots = [{
  id: db.generateNewId(),
  content: "Let's Rock!",
  createdAt: new Date(),
}];

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

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

router.post('/addHoot', (req, res) => {
  const content = req.body && req.body.content
    ? req.body.content
    : 'No req.body or req.body.content found!';

  const hoot = {
    id: db.generateNewId(),
    content,
    createdAt: new Date(),
  };

  hoots.push(hoot);
  res.status(201).json(hoot);
});

// exports

module.exports = router;
