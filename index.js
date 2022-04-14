require('dotenv').config();

const express = require('express');

const userRouter = require('./controllers/userController');
const errorMiddleware = require('./middlewares/errorMiddleware');

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
