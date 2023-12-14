import React, { SetStateAction, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Form from "./components/Form";
import Header from "./components/Header";
import "./App.css";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const App = () => {
  const initialState: Todo[] = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(initialState);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={(value: SetStateAction<Todo | null>) =>
              setEditTodo(value as Todo | null)
            }
          />
        </div>
        <div>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setEditTodo={(value: SetStateAction<Todo>) =>
              setEditTodo(value as Todo)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
