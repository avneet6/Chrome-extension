// Import axios for making HTTP requests
import axios from 'axios';

// Listen for the Chrome extension installation event
chrome.runtime.onInstalled.addListener(() => {
    // Create a new context menu item with the ID 'addTask' and title 'Add Task'
    chrome.contextMenus.create({
      id: 'addTask', // Unique identifier for the menu item
      title: 'Add Task', // The title of the menu item
      contexts: ['all'] // Show this menu item in all contexts
    });
  
    // Add an event listener for when a context menu item is clicked
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      // Check if the clicked menu item is the 'addTask' item
      if (info.menuItemId === 'addTask') {
        // Define the new task to be added
        const newTask = {
          title: 'New Task from Extension', // Title of the new task
          description: 'This is a task added from the Chrome extension.' // Description of the new task
        };
  
        // Send a POST request to the server to add the new task
        axios.post('http://localhost:5001/api/tasks', newTask)
          .then(response => {
            console.log('Task added:', response.data); // Log the response data on successful task addition
            // Optionally, provide feedback to the user
            alert('Task added successfully!'); // Show an alert to inform the user that the task was added successfully
          })
          .catch(error => {
            console.error('Error adding task:', error); // Log any errors that occur during the task addition
          });
      }
    });
});
