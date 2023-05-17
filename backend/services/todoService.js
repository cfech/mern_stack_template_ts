// todoService.js - this service is responsible for all the CRUD operations on the database
// It is called by the controller

const {dbConnection} = require('../dbSetup');

const getTodos = async () => {
  return dbConnection.find();
};

const getTodoById = async (id) => {
  return dbConnection.findById(id);
};

const createTodo = async (todo) => {
  // eslint-disable-next-line
  const newTodo = new dbConnection(todo);
  await newTodo.save();
  return newTodo;
};

const updateTodo = async (id, updates) => {
  const todo = await dbConnection.findById(id);
  if (!todo) {
    return null;
  }
  todo.text = updates.text || todo.text;
  todo.completed = updates.completed || todo.completed;
  await todo.save();
  return todo;
};

const deleteTodo = async (id) => {
  const todo = await dbConnection.findById(id);
  if (!todo) {
    return null;
  }
  await todo.remove();
  return todo;
};

module.exports = {getTodos, getTodoById, createTodo, updateTodo, deleteTodo};
