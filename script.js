// Ensure the DOM is fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask - create a new task list item with a remove button.
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

        // Create a new list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item');

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // When the remove button is clicked, remove this task from the list
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item, then append the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

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

    // Invoke addTask on DOMContentLoaded silently 
    addTask(true);

    document.addEventListener('DOMContentLoaded', function() {
        addTask(true);
    });
});