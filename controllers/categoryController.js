const { db } = require("../services/firebase");

exports.createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = {
      userId: req.user.uid,
      name,
      type
    };
    const doc = await db.collection("categories").add(category);
    res.status(201).json({ id: doc.id, ...category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const snapshot = await db.collection("categories")
      .where("userId", "==", req.user.uid)
      .get();

    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryRef = db.collection("categories").doc(req.params.id);
    await categoryRef.update(req.body);
    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await db.collection("categories").doc(req.params.id).delete();
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
