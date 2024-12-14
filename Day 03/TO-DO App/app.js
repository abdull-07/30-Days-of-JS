const addTaskInput = document.querySelector("#add-task-input");
const addTaskBtn = document.querySelector("#add");
const taskListItem = document.querySelector(".show-task");

// Load from Local Storage
const loadTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed, false); // Load tasks in order from localStorage
    });
};

// Add task to DOM
const addTaskToDOM = (text, completed, isNew = true) => {
    const newTask = document.createElement("li");
    newTask.classList.add("task-item");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("round-checkbox");
    checkbox.checked = completed;

    // Create a paragraph for task text
    const taskText = document.createElement("p");
    taskText.textContent = text;
    taskText.classList.add("task-show");
    if (completed) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "gray";
    }

    // Add event listener to checkbox to mark the task as complete
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        } else {
            taskText.style.textDecoration = "none";
            taskText.style.color = "black";
        }
        reorderAndSaveTasks(); // Reorder and update localStorage
    });

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        taskListItem.removeChild(newTask);
        removeTaskFromLocalStorage(text);
    };

    // Append elements
    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);

    // Add the new task at the top or bottom based on isNew
    if (isNew) {
        taskListItem.insertBefore(newTask, taskListItem.firstChild); // Add at the top
    } else {
        taskListItem.appendChild(newTask); // Add at the bottom for preloaded tasks
    }
};

// Update task in local storage
const updateTaskInLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Remove task from Local Storage
const removeTaskFromLocalStorage = (text) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    updateTaskInLocalStorage(tasks);
};

// Add Task
const addTask = () => {
    const taskText = addTaskInput.value.trim();
    if (taskText === '') {
        alert("Please enter a task");
        return;
    }

    addTaskToDOM(taskText, false, true); // Add task at the top of the DOM

    // Store in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift({ text: taskText, completed: false }); // Add task at the top in localStorage
    updateTaskInLocalStorage(tasks);

    // Clear the input after the task add
    addTaskInput.value = "";
};

// Reorder tasks: completed tasks move to the bottom and store in localStorage
const reorderAndSaveTasks = () => {
    // Retrieve all tasks from DOM
    const tasks = Array.from(document.querySelectorAll(".task-item")).map(task => ({
        text: task.querySelector("p").textContent,
        completed: task.querySelector(".round-checkbox").checked,
    }));

    // Sort tasks: incomplete (false) come first
    tasks.sort((a, b) => a.completed - b.completed);

    // Clear and re-append tasks in DOM
    taskListItem.innerHTML = "";
    tasks.forEach(task => addTaskToDOM(task.text, task.completed, false));

    // Update localStorage with reordered tasks
    updateTaskInLocalStorage(tasks);
};

// Add event listener for the button click
addTaskBtn.addEventListener("click", addTask);

// Add event listener for pressing Enter key
addTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Load tasks from localStorage on page load
loadTask();