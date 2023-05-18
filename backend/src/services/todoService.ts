// todoService.ts - this service is responsible for all the CRUD operations on the database
// It is called by the controller

import { dbConnection } from "../dbSetup";
import { Todo } from "../types/types";

const getTodos = async (): Promise<Todo[]> => {
  return dbConnection.find();
};

const getTodoById = async (id: string): Promise<Todo | null> => {
  return dbConnection.findById(id);
};

const createTodo = async (todo: Todo): Promise<Todo> => {
  // eslint-disable-next-line
  const newTodo = new dbConnection(todo);
  await newTodo.save();
  return newTodo;
};

const updateTodo = async (
  id: string,
  updates: Partial<Todo>
): Promise<Todo | null> => {
  const todo = await dbConnection.findById(id);
  if (!todo) {
    return null;
  }
  todo.text = updates.text || todo.text;
  todo.completed = updates.completed || todo.completed;
  await todo.save();
  return todo;
};

const deleteTodo = async (id: string): Promise<Todo | null> => {
  const todo = await dbConnection.findById(id);
  if (!todo) {
    return null;
  }
  await todo.remove();
  return todo;
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
