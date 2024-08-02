import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    axios.get(`${apiBaseUrl}/v1/todo`)
      .then(response => {
        setTodos(response.data.todos);
      })
      .catch(error => {
        console.error("There was an error fetching the todos!", error);
      });
  }, []);

  const handleAddTodo = () => {
    axios.post(`${apiBaseUrl}/v1/todo`, { todo: { task: newTodo } })
      .then(response => {
        setTodos([...todos, { task: newTodo }]);
        setNewTodo("");
      })
      .catch(error => {
        console.error("There was an error creating the todo!", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Todo List</h1>
      <div className="w-full max-w-md">
        {todos.map((todo, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <p className="text-gray-800">{todo.task}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md flex mt-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default App;