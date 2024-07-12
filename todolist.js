document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        addTask(taskInput.value, taskDate.value);
        taskInput.value = '';
        taskDate.value = '';
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value, taskDate.value);
            taskInput.value = '';
            taskDate.value = '';
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task.text, task.dueDate, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                dueDate: taskItem.querySelector('.task-due-date').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(text, dueDate, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item' + (completed ? ' completed' : '');

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        const taskDueDate = document.createElement('span');
        taskDueDate.className = 'task-due-date';
        taskDueDate.textContent = dueDate;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.title = 'edit';
        editBtn.addEventListener('click', function() {
            editTask(taskItem);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '❌';
        deleteBtn.title = 'delete';
        deleteBtn.addEventListener('click', function() {
            deleteTask(taskItem);
        });

        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = completed ? '✅' : '☑️';
        toggleBtn.title = completed ? 'mark as incomplete' : 'mark as complete';
        toggleBtn.addEventListener('click', function() {
            toggleTaskCompletion(taskItem);
        });

        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);
        taskActions.appendChild(toggleBtn);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskDueDate);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);

        saveTasks();
    }

    function addTask(text, dueDate) {
        if (text.trim() !== '') {
            createTaskElement(text, dueDate);
        }
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text');
        const newText = prompt('edit your task', taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
            saveTasks();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }
});
