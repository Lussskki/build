import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin, toggleForm }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // Tasks stored only in component state
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Login request to backend
      const response = await axios.post('http://localhost:3000/api/login/', formData);
      const { token } = response.data;

      // Store token in localStorage for further authentication
      localStorage.setItem('token', token);

      // Fetch tasks after successful login
      fetchTasks(token);

      setMessage('Login successful!');
      setIsLoggedIn(true);
      handleLogin(formData); // Pass user data to parent component
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch tasks from the backend
  const fetchTasks = async (token) => {
    try {
      const tasksResponse = await axios.get('http://localhost:3000/api/profile/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the local state with tasks from the response
      if (tasksResponse?.data?.data) {
        setTasks(tasksResponse.data.data);
      }
    } catch (error) {
      setMessage('Error fetching tasks.');
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        await axios.post(
          'http://localhost:3000/api/addInfo/add', // Ensure this matches the backend route
          { field1: newTask }, // Sending new task as `field1`
          { headers: { Authorization: `Bearer ${token}` } } // Include the token for authentication
        );

        // Fetch tasks again to refresh the list
        fetchTasks(token);
        setNewTask(''); // Clear input after adding
      } catch (error) {
        setMessage('Error adding task.');
      }
    }
  };

  // Delete a task
  const handleDeleteTask = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const taskToDelete = tasks[index];
      if (!taskToDelete || !taskToDelete._id) return;

      // Send DELETE request with task ID
      await axios.delete(`http://localhost:3000/api/profile/${taskToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch tasks again to refresh the list
      fetchTasks(token);
    } catch (error) {
      setMessage('Error deleting task.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    setIsLoggedIn(false);
    setTasks([]); // Clear tasks state
    setMessage('');
    toggleForm(); // Switch to the sign-up form
  };

  // Display login form when not logged in
  if (!isLoggedIn) {
    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <button onClick={toggleForm}>Sign up</button>
        </p>
        {message && <div className="message">{message}</div>}
      </div>
    );
  }

  // Display task manager when logged in
  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={task._id}>
              {task.field1}  {/* Assuming 'field1' is the task name */}
              <button
                onClick={() => handleDeleteTask(index)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
      <button onClick={handleLogout} style={{ marginTop: '20px', color: 'blue' }}>
        Sign Out
      </button>
    </div>
  );
};

export default Login;
