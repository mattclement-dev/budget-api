const { db } = require("../services/firebase");

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, categoryId, date } = req.body;
    const expense = {
      userId: req.user.uid,
      amount,
      description,
      categoryId,
      date: date || new Date().toISOString()
    };
    const doc = await db.collection("expenses").add(expense);
    res.status(201).json({ id: doc.id, ...expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const snapshot = await db.collection("expenses")
      .where("userId", "==", req.user.uid)
      .orderBy("date", "desc")
      .get();

    const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expenseRef = db.collection("expenses").doc(req.params.id);
    await expenseRef.update(req.body);
    res.json({ message: "Expense updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await db.collection("expenses").doc(req.params.id).delete();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
