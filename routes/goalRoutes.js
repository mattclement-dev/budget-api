const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const goalController = require("../controllers/goalController");

router.use(verifyToken);

router.post("/", goalController.createGoal);
router.get("/", goalController.getGoals);
router.put("/:id", goalController.updateGoal);
router.delete("/:id", goalController.deleteGoal);

module.exports = router;
