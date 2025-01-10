import Task from '../models/Task.js';

export const getTasksByEvent = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
