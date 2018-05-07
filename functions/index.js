const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);
const db = admin.database();

const app = express();
app.use(bodyParser.json());

app.post('/messages', (req, res) => {
  const message = req.body.message;
  db.ref('/messages').push(message).then(() => {
    res.send(message);
  });
});

exports.app = functions.https.onRequest(app);
