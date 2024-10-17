const express = require('express');
const db = require('../db.js');

const router = express.Router();

// const hoots = [{
//   id: db.generateNewId(),
//   content: "Let's Rock!",
//   createdAt: new Date(),
// },
// {
//   id: db.generateNewId(),
//   content: 'Birds arent real!',
//   createdAt: new Date(),
// },
// ];

const hoots = [{
  id: '11111111-2222-3333-4444-555555555555',
  content: "Let's Rock!",
  createdAt: new Date(),
},
{
  id: '66666666-7777-8888-9999-000000000000',
  content: "Bird's aren't real!",
  createdAt: new Date(),
},
];

const hootToXML = (hoot) => {
  let xmlStr = `<hoot id="${hoot.id}" createdAt="${hoot.createdAt}">`;
  xmlStr += hoot.content;
  xmlStr += '</hoot>';
  return xmlStr;
};

// paths

router.head('/hoots', (req, res) => {
  console.log('HEAD called');
  const { length } = JSON.stringify(hoots);
  res.set({
    'Content-Type': 'application/json',
    'Content-Length': length,
    'X-Coder': 'JH',
  });
  res.end();
});

// router.get('/hoots', (req, res) => {
//   console.log('GET called');
//   res.json(hoots);
// });

router.get('/hoots', (req, res) => {
  //if the "Accept" header contains "application/xml"
  //if (req.accepts('application/xml')){

  if (req.get('Accept') === 'application/xml') {
    res.header('Content-Type', 'application/xml');
    // OR res.type('application/xml');
    const str = `<hoots>
    ${hoots.map((h) => hootToXML(h)).join('')}
    </hoots>`;
    res.send(str);
  } else {
    res.json(hoots);
  }
});

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
  if (content === 'No req.body or req.body.content found!') {
    res.status(400).json(hoot);
  } else {
    hoots.push(hoot);
    res.status(201).json(hoot);
  }
});

const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content
      ? req.body.content
      : 'No req.body or req.body.content found!';
    if (content === 'No req.body or req.body.content found!') {
      res.status(400).json(hoot);
    } else {
      hoot.content = content;
      hoot.updatedAt = new Date();
      res.json(hoot);
    }
  }
});

router.get('/hoots/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  const hoot = getHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    res.status(200).json(hoot);
  }
});

// exports

module.exports = router;
