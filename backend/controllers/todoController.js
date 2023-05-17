// todoController.js - this controller is responsible for handling all requests to the /todos endpoint
// It calls the todoService for updating the database

const express = require('express');
const todoService = require('../services/todoService');

// eslint-disable-next-line
const router = express.Router();

router.get('/todos', async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({error: 'Todo not found'});
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post('/todos', async (req, res) => {
  const {text, completed} = req.body;
  if (!text) {
    return res.status(400).json({error: 'Text is required'});
  }
  try {
    const todo = await todoService.createTodo({
      text,
      completed: completed || false,
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const {text, completed} = req.body;
  try {
    const todo = await todoService.updateTodo(id, {text, completed});
    if (!todo) {
      return res.status(404).json({error: 'Todo not found'});
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoService.deleteTodo(id);
    if (!todo) {
      return res.status(404).json({error: 'Todo not found'});
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
