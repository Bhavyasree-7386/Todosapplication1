

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./todostyle.css"
const TODOApps = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos,newTodo]);  
      setNewTask('');
      setErrorMessage("");
    } else {
      setErrorMessage("Text should not be empty"); 
    }

  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask = (id, newTitle) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos;

  return (
    <div>
      <h1>Todo App</h1>
      
      <div>
      <input
          id="input1"
          type="text"
          placeholder="Enter Task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setErrorMessage(""); 
          }}
        />
        <button id="addstyle" onClick={handleAddTask}>Add Task</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div>
        <label>
          <h3>Show Completed</h3>
          <input id="checkboxstyle"
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
      </div>
      <ol id="fontstyle">
        
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : 'none' }} id="liststyle">
            {todo.title}
            
            <div id="buttonstyle">
            <button onClick={() => handleToggleComplete(todo.id)} id="completestyle">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleEditTask(todo.id, prompt('Enter new title:', todo.title))} id="editstyle"
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTask(todo.id)} id="deletestyle">Delete</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TODOApps;