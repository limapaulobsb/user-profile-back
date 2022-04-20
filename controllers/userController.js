const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    const { id } = await userService.create(payload);
    return res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const user = req.query.q;
    const result = user
      ? await userService.findByUser(user)
      : await userService.findAll();
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

userRouter.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    await userService.update(Number(req.params.id), payload, req.session);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    await userService.destroy(Number(req.params.id), req.session);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
