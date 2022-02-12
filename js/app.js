const taskInput = document.querySelector('.task__input');
const taskButton = document.querySelector('.task__button');
const taskList = document.querySelector('.task__list');
const filterOption = document.querySelector('.filter__task');

document.addEventListener('DOMContentLoaded', getTasks);
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTasks);

function addTask(e) {
    e.preventDefault();

    //TaskList
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value === '' ? 'No task' : taskInput.value;
    newTask.classList.add('task__item');
    taskDiv.appendChild(newTask);

    saveTasksLocal(taskInput.value);

    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkButton.classList.add('check__btn');
    taskDiv.appendChild(checkButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add('trash__btn');
    taskDiv.appendChild(trashButton);

    taskList.appendChild(taskDiv);

    taskInput.value = '';
}

function deleteCheck(e) {
    if (e.target.classList.contains('trash__btn')) {
        const task = e.target.parentElement;
        task.classList.add('fall');
        removeLocalTasks(task);
        task.addEventListener('transitionend', function() {
            task.remove();
        });
    }
    if (e.target.classList.contains('check__btn')) {
        const task = e.target.parentElement;
        task.classList.toggle('completed');
    }
}

function filterTasks(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function(task) {
        const taskStyle = task.style;
        if (taskStyle !== undefined && taskStyle !== null) {
            switch (e.target.value) {
                case "all":
                    taskStyle.display = 'flex';
                    break;
                case "completed":
                    if (task.classList.contains('completed')) {
                        taskStyle.display = 'flex';
                    } else {
                        taskStyle.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!task.classList.contains('completed')) {
                        taskStyle.display = 'flex';
                    } else {
                        taskStyle.display = 'none';
                    }
                    break;
            }
        }
    });
}

function saveTasksLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        const newTask = document.createElement('li');
        newTask.innerText = task;
        newTask.classList.add('task__item');
        taskDiv.appendChild(newTask);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkButton.classList.add('check__btn');
        taskDiv.appendChild(checkButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.classList.add('trash__btn');
        taskDiv.appendChild(trashButton);

        taskList.appendChild(taskDiv);
    })
}

function removeLocalTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}