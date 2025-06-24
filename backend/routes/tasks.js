const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { Task } = require('../models');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.findAll({ where: { UserId: req.userId } });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, UserId: req.userId });
  res.json(task);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!task) return res.sendStatus(404);

  task.title = req.body.title ?? task.title;
  task.status = req.body.status ?? task.status;
  await task.save();

  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.destroy({ where: { id: req.params.id, UserId: req.userId } });
  res.sendStatus(204);
});



module.exports = router;