
let taskInput = document.querySelector('.task__input');
let btnAdd = document.querySelector('.btn__add');
let display = document.querySelector('.display');
let showError = document.querySelector('.error');


let data = localStorage.getItem('tasks');

if (data) {
    console.log(JSON.parse(data))
    let newArray = JSON.parse(data);
    newArray.forEach(item => {
        let row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = `
                <h2 class="nametask">${item.task}</h2>
                <div>
                    <button class="btn btn__done">done</button>
                    <button class="btn btn__delete">delete</button>
                </div>`;
        display.appendChild(row);
        showError.style.display = 'none';

    });
}
else {
    showError.style.display = 'block';
}

btnAdd.addEventListener('click', function (e) {
    // remove reload from window
    e.preventDefault();

    if (taskInput.value !== '' && taskInput.value.length <= 50) {
        // call function createElements
        createElements();
        // call function to save the data in localStorage
        saveData();
    }

});

function createElements() {


    // Hold the value of field input
    let task = taskInput.value;
    // create the row
    let row = document.createElement('div');
    row.classList.add('row');
    row.innerHTML = `
        <h2 class="nametask">${task}</h2>
        <div>
            <button class="btn btn__done">done</button>
            <button class="btn btn__delete">delete</button>
        </div>`;

    // append the row to the display
    showError.style.display = 'none';
    display.appendChild(row);
}

const saveData = () => {

    // create object to save the data
    let allData = {
        task: taskInput.value,
        id: Math.floor(Math.random() * 1000)
    };

    // get the data from localStorage
    let newArray = JSON.parse(localStorage.getItem('tasks')) ?
        JSON.parse(localStorage.getItem('tasks')) : [];

    // add the data to the array
    newArray.push(allData);

    // save the data in localStorage
    localStorage.setItem('tasks', JSON.stringify(newArray));

    // clear the field input
    taskInput.value = '';
}