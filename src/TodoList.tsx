import React, { FC } from "react";
import { Todo } from "./App.tsx";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setEditTodo: (todo: Todo) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos, setEditTodo }) => {
  const handleComplete = (todo: Todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }: Todo) => {
    const findTodo = todos.find((todo) => todo.id === id);
    if (findTodo) {
      setEditTodo(findTodo);
    }
  };

  const handleDelete = ({ id }: Todo) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <li className="list-items" key={todo.id}>
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "complete" : ""}`}
            onChange={(event) => event.preventDefault()}
          />
          <div>
            <button
              className="button-complete task-button"
              onClick={() => handleComplete(todo)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            <button
              className="button-edit task-button"
              onClick={() => handleEdit(todo)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodoList;
