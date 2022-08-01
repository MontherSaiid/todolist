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
        console.log(nameTask.parentElement.getAttribute('data-id'));

        // get the id of the name task
        if (nameTask.parentElement.getAttribute('data-id') == id) {
            // toggle the class to change the color
            nameTask.classList.toggle('thro');
        }
        // change the name of the buttons
        e.target.innerHTML === 'done' ? e.target.innerHTML = 'undo' : e.target.innerHTML = 'done';
    }
});