const express = require("express");
const router = express.Router();

const controller = require("../controllers/leaveController");
const { authenticateJWT, requireManager } = require("../middlewares/authMiddleware");

// Employee access
router.post("/submit", authenticateJWT, controller.submitLeave);
router.get("/balance/:id", authenticateJWT, controller.getLeaveBalance);
router.get("/my", authenticateJWT, controller.getMyLeaves);

// Manager access
router.get("/pending", authenticateJWT, requireManager, controller.getPendingLeaves);
router.put("/approve/:id", authenticateJWT, requireManager, controller.approveLeave);
router.put("/reject/:id", authenticateJWT, requireManager, controller.rejectLeave);
router.get("/all", authenticateJWT, requireManager, controller.getAllLeaves);
router.get("/on-leave", authenticateJWT, requireManager, controller.getEmployeesCurrentlyOnLeave);
router.get("/calendar", authenticateJWT, requireManager, controller.getLeaveCalendar);

module.exports = router;
