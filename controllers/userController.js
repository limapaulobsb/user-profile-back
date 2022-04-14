const { Router } = require('express');

const userService = require('../services/userService');

const userRouter = Router();

userRouter.post('/', async ({ body: payload }, res, next) => {
  try {
    const result = await userService.create(payload);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', async (_req, res, next) => {
  try {
    const result = await userService.findAll();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async ({ params: { id } }, res, next) => {
  try {
    const result = await userService.findById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:id', async ({ body: payload, params: { id } }, res, next) => {
  try {
    await userService.update(payload, id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.destroy(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;