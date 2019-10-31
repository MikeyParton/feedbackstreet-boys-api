require('dotenv').config();
const express = require('express');
const cors = require('cors');
const upload = require('./services/upload');
const sendMessage = require('./services/sendMessage');

const app = express();
const PORT = process.env.PORT;
const channel = 'GPZV34TU0';

app.use(express.json());
app.options('*', cors());

app.post('/images', cors(), upload.single('image'), function(req, res) {
  res.send(req.file.location);
});

app.post('/feedback', cors(), function(req, res) {
  sendMessage({
    ...req.body,
    channel
  });
  res.send('success!');
});

app.post('/messages', cors(), function(req, res) {
  res.send('success');
});

app.listen(PORT , function() {
  console.log(`App is running on ${PORT}!`);
});


