const { Router } = require('express');
const loginService = require('../services/loginService');

const loginRouter = Router();

loginRouter.post('/', async (req, res, next) => {
  try {
    const { user, password } = req.body;
    const token = await loginService.login(user, password);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
