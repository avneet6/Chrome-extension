

import React, { useState, useEffect } from 'react'; //import
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('There was an error fetching tasks.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.description) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5001/api/tasks', newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setError('There was an error adding the task.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:5001/api/tasks/${id}`, updatedTask);
      setTasks((prevTasks) => prevTasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      setError('There was an error updating the task.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      setError('There was an error deleting the task.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h1>Productivity Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      ></textarea>
      <button onClick={handleAddTask}>Add Task</button>
      <h2>Incomplete Tasks</h2>
      <ul>
        {incompleteTasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleUpdateTask(task._id, { ...task, completed: true })}>
              Mark Complete
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button disabled>
              Completed
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
