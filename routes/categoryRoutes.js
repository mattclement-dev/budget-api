const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.use(verifyToken);

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
