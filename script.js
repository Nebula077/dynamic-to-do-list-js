// Ensure the DOM is fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array from Local Storage or empty array
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    /**
     * saveTasks - Save the current tasks array to Local Storage
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * renderTask - Create and render a task element in the DOM
     * @param {string} taskText - The text content of the task
     */
    function renderTask(taskText) {
        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // When the remove button is clicked, remove this task from the list and Local Storage
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            // Remove task from the tasks array
            tasks = tasks.filter(task => task !== taskText);
            // Update Local Storage
            saveTasks();
        };

        // Append the remove button to the list item, then append the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * loadTasksFromStorage - Load and render all tasks from Local Storage
     */
    function loadTasksFromStorage() {
        // Clear the task list
        taskList.innerHTML = '';
        // Render each task from the tasks array
        tasks.forEach(task => {
            renderTask(task);
        });
    }

    /**
     * addTask - Create a new task, add it to the array, and save to Local Storage
     * @param {boolean} silentOnEmpty - when true, do not show alert if input is empty.
     */
    function addTask(silentOnEmpty = false) {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If the input is empty, alert the user (unless silentOnEmpty is true)
        if (taskText === '') {
            if (!silentOnEmpty) {
                alert('Please enter a task.');
            }
            return;
        }

        // Add the task to the tasks array
        tasks.push(taskText);
        // Save the updated tasks array to Local Storage
        saveTasks();
        // Render the new task in the DOM
        renderTask(taskText);

        // Clear and focus the input for convenience
        taskInput.value = '';
        taskInput.focus();
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Allow adding a task by pressing Enter inside the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from Local Storage when the page loads
    loadTasksFromStorage();
});