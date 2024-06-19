const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Create Task
router.post('/', auth, async (req, res) => {
  const { title, description, deadline, sharedWith } = req.body;
  try {
    const task = new Task({
      title,
      description,
      deadline,
      owner: req.userId,
      sharedWith
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Get User Tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Get Shared Tasks
router.get('/shared', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ sharedWith: req.userId }).populate('owner', 'name username');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shared tasks' });
  }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
  const { title, description, deadline, sharedWith } = req.body;
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.sharedWith = sharedWith;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

module.exports = router;
