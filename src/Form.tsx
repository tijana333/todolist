import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface FormProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  editTodo: Todo | null;
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const Form: React.FC<FormProps> = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodo,
  setEditTodo,
}) => {
  const updateTodo = (title: string, id: string, completed: boolean) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo({ id: "", title: "", completed: false });
  };

  useEffect(() => {
    if (editTodo?.id) {
      setInput(editTodo?.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editTodo?.id) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a To do..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="buttom-add" type="submit">
        {editTodo?.id ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
