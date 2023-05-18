"use strict";
// todoService.ts - this service is responsible for all the CRUD operations on the database
// It is called by the controller
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo =
  exports.updateTodo =
  exports.createTodo =
  exports.getTodoById =
  exports.getTodos =
    void 0;
const dbSetup_1 = require("../dbSetup");
const getTodos = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return dbSetup_1.dbConnection.find();
  });
exports.getTodos = getTodos;
const getTodoById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return dbSetup_1.dbConnection.findById(id);
  });
exports.getTodoById = getTodoById;
const createTodo = (todo) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line
    const newTodo = new dbSetup_1.dbConnection(todo);
    yield newTodo.save();
    return newTodo;
  });
exports.createTodo = createTodo;
const updateTodo = (id, updates) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield dbSetup_1.dbConnection.findById(id);
    if (!todo) {
      return null;
    }
    todo.text = updates.text || todo.text;
    todo.completed = updates.completed || todo.completed;
    yield todo.save();
    return todo;
  });
exports.updateTodo = updateTodo;
const deleteTodo = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield dbSetup_1.dbConnection.findById(id);
    if (!todo) {
      return null;
    }
    yield todo.remove();
    return todo;
  });
exports.deleteTodo = deleteTodo;
