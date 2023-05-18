"use strict";
// todoController.ts - this controller is responsible for handling all requests to the /todos endpoint
// It calls the todoService for updating the database
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoService = __importStar(require("../services/todoService"));
// eslint-disable-next-line
const router = express_1.default.Router();
// TODO - what should promise return?
router.get("/todos", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const todos = yield todoService.getTodos();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
router.get("/todos/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
      const todo = yield todoService.getTodoById(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
router.post("/todos", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id, text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    try {
      const todo = yield todoService.createTodo({
        id,
        text,
        completed: completed || false,
      });
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
router.put("/todos/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { text, completed } = req.body;
    try {
      const todo = yield todoService.updateTodo(id, {
        text,
        completed,
      });
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
router.delete("/todos/:id", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
      const todo = yield todoService.deleteTodo(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.sendStatus(204);
      // TODO - what is this error code?
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
);
exports.default = router;
