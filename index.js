require('dotenv').config();

const express = require('express');

const port = process.env.PORT;

const app = express();

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Hello my friends' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
