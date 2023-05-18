// todoController.ts - this controller is responsible for handling all requests to the /todos endpoint
// It calls the todoService for updating the database

import express, { Request, Response } from "express";
import { Todo } from "../types/types";
import * as todoService from "../services/todoService";

// eslint-disable-next-line
const router = express.Router();

// TODO - what should promise return?

router.get("/todos", async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: Todo[] = await todoService.getTodos();
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/todos/:id", async (req: Request, res: Response): Promise<any> => {
  const id: string = req.params.id;
  try {
    const todo: Todo | null = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/todos", async (req: Request, res: Response): Promise<any> => {
  const { id, text, completed } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  try {
    const todo: Todo = await todoService.createTodo({
      id,
      text,
      completed: completed || false,
    });
    res.json(todo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/todos/:id", async (req: Request, res: Response): Promise<any> => {
  const id: string = req.params.id;
  const { text, completed } = req.body;
  try {
    const todo: Todo | null = await todoService.updateTodo(id, {
      text,
      completed,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete(
  "/todos/:id",
  async (req: Request, res: Response): Promise<any> => {
    const id: string = req.params.id;
    try {
      const todo: Todo | null = await todoService.deleteTodo(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.sendStatus(204);
      // TODO - what is this error code?
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
