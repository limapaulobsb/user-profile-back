require('dotenv').config();

const express = require('express');
const cors = require('cors');
const loginRouter = require('./controllers/loginController');
const userRouter = require('./controllers/userController');
const errorMiddleware = require('./middlewares/errorMiddleware');

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

// app.get('/', (_req, res) => res.status(200).send('User Profile'));

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
