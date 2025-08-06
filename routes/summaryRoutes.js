const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const summaryController = require("../controllers/summaryController");

router.use(verifyToken);

router.get("/", summaryController.getSummary);

module.exports = router;
