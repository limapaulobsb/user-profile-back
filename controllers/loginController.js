const { Router } = require('express');
const loginService = require('../services/loginService');

const loginRouter = Router();

loginRouter.post('/', async ({ body: payload }, res, next) => {
  try {
    const token = await loginService.login(payload);
    return res.status(200).json({token});
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
