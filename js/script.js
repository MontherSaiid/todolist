
let taskInput = document.querySelector('.task__input');
let btnAdd = document.querySelector('.btn__add');
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
    // remove reload from window
    e.preventDefault();
    // check if th input not empty and length is letter than or equal 50
    if (taskInput.value !== '' && taskInput.value.length <= 50) {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

let nameTask = document.querySelector('.nametask');

display.addEventListener('click', function (e) {
    //hold the id if the button is clicked
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    if (e.target.classList.contains('btn__delete')) {
        // check if there class thro to delete it
        if (nameTask.classList.contains('thro')) {
            // remove task from localStorage
            removeTask(id);
            // remove task from page
            e.target.parentElement.parentElement.remove();
        }
    }

    if (e.target.classList.contains('btn__done')) {
        // toggle the class to change the text of the button
        e.target.classList.toggle('undo');
        // get the id of the name task
        if (nameTask.parentElement.getAttribute('data-id') == id) {
            // toggle the class to change the color
            nameTask.classList.toggle('thro');
        }
        // change the name of the buttons
        e.target.innerHTML == 'Done' ? e.target.innerHTML = 'Undo' : e.target.innerHTML = 'Done';
    }
});

function addTask(task) {
    // create object to save the data
    let allData = {
        id: Math.floor(Math.random() * 100),
        taskTitle: task,
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
        <h2 class="nametask" data-id=${task.id}>${task.taskTitle}</h2>
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
    showError.style.display = 'block';
}

function removeTask(id) {
    arrayTasks = arrayTasks.filter((task) => task.id != id);
    saveData(arrayTasks);
}