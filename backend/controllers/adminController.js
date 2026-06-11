const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User Status
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be active or inactive",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User Status Updated Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "createdBy",
      "name email"
    );

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Activity Logs
const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: logs.length,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Any Task
const deleteAnyTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Analytics
const getAnalytics = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "completed",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: "pending",
      });

    res.status(200).json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  getLogs,
  deleteAnyTask,
  getAnalytics,
};

