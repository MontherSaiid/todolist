let taskInput = document.querySelector('.task__input');
let btnAdd = document.querySelector('.btn__add');
let btnClear = document.querySelector('.btn__clear');
let display = document.querySelector('.display');
let showError = document.querySelector('.error');

// storage tasks
let arrayTasks = [];

// call getData from localStorage
getData();

// check if there are any tasks in localStorage
if (localStorage.getItem('tasks')) {
    arrayTasks = JSON.parse(localStorage.getItem('tasks'));
}

// Add task
btnAdd.addEventListener('click', function (e) {
    let valInput = taskInput.value.trim();
    // remove reload from window
    e.preventDefault();
    // check if th input not empty and length is letter than or equal 50
    if (valInput !== '' && valInput.length <= 50) {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

let nameTask = document.querySelector('.nametask');
let checkTask = document.querySelector('.checkTask');
let btns = document.querySelector('.row .buttons');

display.addEventListener('click', function (e) {
    console.log(checkTask.checked)
    //hold the id if the button is clicked
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    if (e.target.classList.contains('btn__delete')) {
        let ok = confirm('Are you sure you want to delete this task?');
        if (ok) {
            // check if there class thro in task and it checked
            if (nameTask.classList.contains('thro') && checkTask.checked) {
                // remove task from localStorage
                removeTask(id);
                // remove task from page
                e.target.parentElement.parentElement.remove();
            }
        }
    }

    if (e.target.classList.contains('btn__done')) {
        // toggle the class to change the text of the button
        e.target.classList.toggle('undo');
        console.log("id", nameTask.parentElement.parentElement.getAttribute('data-id'), "=", id)
        // get the id of the name task
        if (nameTask.parentElement.parentElement.getAttribute('data-id') === id) {
            // toggle the class to change the color
            nameTask.classList.toggle('thro');
        }
        // change the name of the buttons
        e.target.innerHTML == 'Done' ?
            e.target.innerHTML = 'Undo' :
            e.target.innerHTML = 'Done';
    }
    // toggle background color of row
    if (e.target.classList.contains('row')) {
        e.target.classList.toggle('done');
    }
});

// add tasks to array of tasks
function addTask(task) {
    // create object to save the data
    let allData = {
        id: Math.floor(Math.random() * 100),
        taskTitle: task
    };

    // add the data to the array
    arrayTasks.push(allData);
    // create elements
    createElements(arrayTasks);
    // call function to save the data in localStorage
    saveData(arrayTasks);
    // reload for the page
    location.reload();
}

function createElements(allTasks) {
    // empty display content to void the repeated tasks
    display.innerHTML = '';
    // create the row
    allTasks.forEach(task => {
        // declare the div
        let row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('data-id', task.id);
        // create the column
        row.innerHTML = `
        <div class="textTask">
            <input type="checkbox" name="Male" class="checkTask" />
            <h2 class="nametask" data-id=${task.id}>${task.taskTitle}</h2>
        </div>
        <div class="buttons">
            <button class="btn btn__done" data-id=${task.id}>Done</button>
            <button class="btn btn__delete" data-id=${task.id}>Delete</button>
        </div>`;
        // display error message
        showError.style.display = 'none';
        // append the row to the display
        display.appendChild(row);
    });
}

function saveData(allTasks) {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function getData() {
    let data = localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        createElements(tasks);
    }
    // showError.style.display = 'block';
}

function removeTask(id) {
    arrayTasks = arrayTasks.filter((task) => task.id != id);
    saveData(arrayTasks);
}

// clear all the tasks
btnClear.addEventListener('click', function (e) {
    e.preventDefault();
    if (arrayTasks.length > 0) {
        if (checkTask.checked) {
            // remove all tasks from localStorage
            localStorage.removeItem('tasks');
            // remove all tasks from page
            display.innerHTML = '';
            // reload for the page
            location.reload();
        }
    }

});

if (arrayTasks.length > 0) {
    // check if the task is checked
    checkTask.addEventListener('click', function () {
        if (checkTask.checked) {
            nameTask.classList.add('thro');
        } else {
            nameTask.classList.remove('thro');
        }
    });
}

