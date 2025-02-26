// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the add task button and input fields
    const addTaskButton = document.getElementById('addTaskButton');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
  
    // Add an event listener for the click event on the add task button
    addTaskButton.addEventListener('click', () => {
      // Get the values from the input fields
      const title = taskTitleInput.value;
      const description = taskDescriptionInput.value;
  
      // Check if the title or description is empty
      if (!title || !description) {
        alert('Please enter a title and description.'); // Show an alert if either is empty
        return; // Exit the function if either field is empty
      }
  
      // Create a new task object with the title and description
      const newTask = {
        title: title,
        description: description,
      };
  
      // Send a POST request to the server to add the new task
      fetch('http://localhost:5001/api/tasks', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(newTask), // Convert the new task object to a JSON string
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          console.log('Task added:', data); // Log the response data on successful task addition
          alert('Task added successfully!'); // Show an alert to inform the user that the task was added successfully
          taskTitleInput.value = ''; // Clear the title input field
          taskDescriptionInput.value = ''; // Clear the description input field
        })
        .catch((error) => {
          console.error('Error adding task:', error); // Log any errors that occur during the task addition
          alert('Error adding task. Please try again.'); // Show an alert if there is an error
        });
    });
});
