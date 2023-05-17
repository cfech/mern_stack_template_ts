import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import axios from "axios";

interface Todo {
  id: number;

  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    axios
      .get("http://localhost:80/api/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id: number = parseInt(e.target.getAttribute("data-id"));
    const nextTodos = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });

    // console.log(nextTodos)
    setTodos(nextTodos);
  };

  return (
    <>
      <h1>C lick the button update TESTING to load the todos</h1>
      <h4>
        This sends a get request to the backend node.js api at
        http://localhost:80/api/todos
      </h4>
      <h4>This will return an array of todos that are mapped the DOM</h4>

      <button onClick={getTodos}>Get Todos</button>
      <h1>Todos:</h1>
      {todos.length > 0
        ? todos.map((todo) => (
            <div key={uuidv4()} style={{ display: "flex" }}>
              <h2>{todo.text}</h2>
              <input
                onChange={(e) => {
                  toggleCompleted(e);
                }}
                type={"checkbox"}
                checked={todo.completed}
                data-id={todo.id}
              />
            </div>
          ))
        : null}
    </>
  );
}

export default App;
