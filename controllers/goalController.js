const { db } = require("../services/firebase");

exports.createGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, currentAmount, deadline } = req.body;
    const goal = {
      userId: req.user.uid,
      goalName,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline
    };
    const doc = await db.collection("goals").add(goal);
    res.status(201).json({ id: doc.id, ...goal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const snapshot = await db.collection("goals")
      .where("userId", "==", req.user.uid)
      .orderBy("deadline", "asc")
      .get();

    const goals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goalRef = db.collection("goals").doc(req.params.id);
    await goalRef.update(req.body);
    res.json({ message: "Goal updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    await db.collection("goals").doc(req.params.id).delete();
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
