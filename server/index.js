const express = require('express');
const bodyParser = require('body-parser');
const { saveSong, getNames, getSong } = require('../database/index.js');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/songs/save', (req, res) => {
  let data = req.body;
  saveSong(data, result => {
      res.status(201).send(result[0]);
  });
});

app.get('/songs/name', (req, res) => {
  getNames( result => {
    result = result.map( item => item.name);
    res.status(200).send(result);
  });
});

app.get('/songs/song', (req, res) => {
  let data = req.query;
  getSong(data, result => {
    res.status(200).send(result[0]);
  })
})

app.listen(3000, () =>  console.log('listening on port 3000!'));

