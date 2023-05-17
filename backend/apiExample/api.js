// api.js - example file of a controller and service in 1

// Import dependencies
const express = require("express");
const { dbConnection } = require("../dbSetup");
// eslint-disable-next-line
const router = express.Router();

// Define CRUD endpoints
router.get("/todos", async (req, res) => {
  const todos = await dbConnection.find();
  res.json(todos);
});

router.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await dbConnection.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/todos", async (req, res) => {
  const { text, completed } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  // eslint-disable-next-line
  const todo = new dbConnection({text, completed: completed || false});
  try {
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update todo
router.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { text, completed } = req.body;
  try {
    const todo = await dbConnection.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    todo.text = text || todo.text;
    todo.completed = completed || todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
router.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await dbConnection.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await todo.remove();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
