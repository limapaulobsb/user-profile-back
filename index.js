const express = require('express');

const PORT = 3000;

const app = express();

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Hello My friends' });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
