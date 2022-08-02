
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