const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    await ActivityLog.create({
      user: req.user.id,
      action: "Task Created",
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get My Tasks
const getMyTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.user.id,
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Task
const updateTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description ||
      task.description;

    task.status =
      req.body.status ||
      task.status;

    await task.save();

    await ActivityLog.create({
      user: req.user.id,
      action: "Task Updated",
    });

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    await ActivityLog.create({
      user: req.user.id,
      action: "Task Deleted",
    });

    res.status(200).json({
      message: "Task Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
};