const { db } = require("../services/firebase");

exports.getSummary = async (req, res) => {
  try {
    const snapshot = await db.collection("expenses")
      .where("userId", "==", req.user.uid)
      .get();

    let total = 0;
    const byCategory = {};

    snapshot.forEach(doc => {
      const { amount, categoryId } = doc.data();
      total += Number(amount);
      byCategory[categoryId] = (byCategory[categoryId] || 0) + Number(amount);
    });

    res.json({ total, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
