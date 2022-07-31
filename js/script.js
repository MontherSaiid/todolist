
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
        e.target.classList.toggle('undo');
        if (nameTask.parentElement.getAttribute('data-id') == id) {
            nameTask.classList.toggle('thro');
        }

        e.target.innerHTML === 'done' ? e.target.innerHTML = 'undo' : e.target.innerHTML = 'done';

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
    display.innerHTML = '';
    // create the row
    allTasks.forEach(task => {
        let row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('data-id', task.id);

        row.innerHTML = `
        <h2 class="nametask" data-id=${task.id}>${task.taskTitle}</h2>
        <div>
            <button class="btn btn__done" data-id=${task.id}>done</button>
            <button class="btn btn__delete" data-id=${task.id}>delete</button>
        </div>`;

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