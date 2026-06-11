const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  getLogs,
  deleteAnyTask,
  getAnalytics,
} = require("../controllers/adminController");

// ================= USERS =================

// Get All Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

//Analytics Route
router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

//Delete Any Task Route
router.delete(
  "/tasks/:id",
  authMiddleware,
  adminMiddleware,
  deleteAnyTask
);


// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

// Update User Status
router.patch(
  "/users/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatus
);

// ================= TASKS =================

// Get All Tasks
router.get(
  "/tasks",
  authMiddleware,
  adminMiddleware,
  getAllTasks
);

// ================= LOGS =================

// Get Activity Logs
router.get(
  "/logs",
  authMiddleware,
  adminMiddleware,
  getLogs
);

module.exports = router;