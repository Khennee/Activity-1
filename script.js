const addBtn = document.getElementById('ADD_BUTTON');
const todoBody = document.getElementById('ADD_TO_DO');
const doneBtn = document.getElementById('DONE_BUTTON');
const finishedBody = document.getElementById('FINISHED_TASKS');
const inputField = document.getElementById('TYPE_WORD');

// add event listener to the input field
inputField.addEventListener('focus', resetInput);

// add event listener to the input field to listen for Enter key press
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function resetInput() {
    const inputValue = inputField.value;
    if (inputValue === "- - - - - - - - required input - - - - - - - -") {
        inputField.value = "";
        inputField.style.color = "black";
        inputField.classList.remove('REQUIRED_INPUT');
    }
    
}

// add event listener to the add button
addBtn.addEventListener('click', addTask);

// function to add a new task
function addTask() {
    const inputValue = document.getElementById('TYPE_WORD').value.trim();
    if  (inputValue === "" || inputValue === "- - - - - - - - required input - - - - - - - -"){
        document.getElementById('TYPE_WORD').value = "";
        document.getElementById('TYPE_WORD').style.color = "red";
        document.getElementById('TYPE_WORD').classList.add('REQUIRED_INPUT');
        document.getElementById('TYPE_WORD').value = "- - - - - - - - required input - - - - - - - -";
        return;
    } 

    resetInput()
    // create a new table row
    const row = document.createElement('tr');

    // create the table data for the checkbox
    const checkboxTd = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkboxTd.appendChild(checkbox);

    // create the table data for the task text
    const taskTd = document.createElement('td');
    taskTd.textContent = inputValue;

    const dateTd = document.createElement('td');
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    dateTd.textContent = formattedDate;

    // create the table data for the remove button
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete';
    removeBtn.addEventListener('click', removeTask);
     removeBtn.classList.add('REMOVE_BTN');
    removeTd.appendChild(removeBtn);

    // add the table data to the row
    row.appendChild(checkboxTd);
    row.appendChild(taskTd);
    row.appendChild(dateTd);
    row.appendChild(removeTd);

    // add the row to the table body
    todoBody.appendChild(row);

    // clear the input value
    document.getElementById('TYPE_WORD').value = '';
}

// function to remove a task
function removeTask(event) {
    // get the row that contains the remove button
    const row = event.target.parentNode.parentNode;

    // remove the row from the table body
    todoBody.removeChild(row);
}

// add event listener to the done button
doneBtn.addEventListener('click', finishTasks);

// function to finish tasks
function finishTasks() {
    // get all the rows in the todo table
    const rows = todoBody.children;

    // loop through each row
    for (let i = 0; i < rows.length; i++) {
        // get the checkbox in the row
        const checkbox = rows[i].children[0].children[0];

        // check if the checkbox is checked
        if (checkbox.checked) {
            // create a new row for the finished table
            const finishedRow = document.createElement('tr');

            // create the table data for the task text
            const finishedTaskTd = document.createElement('td');
            finishedTaskTd.textContent = rows[i].children[1].textContent;
            finishedTaskTd.classList.add('FINISHED');

            const finishedDateTd = document.createElement('td');
            const finishedDate = new Date();
            const formattedFinishedDate = finishedDate.toLocaleDateString();
            finishedDateTd.textContent = formattedFinishedDate;
            
            // create the table data for the remove button
            const finishedRemoveTd = document.createElement('td');
            const finishedRemoveBtn = document.createElement('button');
            finishedRemoveBtn.textContent = 'Delete';
            finishedRemoveBtn.addEventListener('click', removeFinishedTask);
            finishedRemoveTd.appendChild(finishedRemoveBtn);

            // add the table data to the row
            finishedRow.appendChild(finishedTaskTd);
            finishedRow.appendChild(finishedDateTd);
            finishedRow.appendChild(finishedRemoveTd);

            // add the row to the finished table
            finishedBody.appendChild(finishedRow);

            // remove the row from the todo table
            todoBody.removeChild(rows[i]);

            // decrement i since we removed a row
            i--;
        }
    }
}

// function to remove a finished task
function removeFinishedTask(event) {
    // get the row that contains the remove button
    const row = event.target.parentNode.parentNode;

    // remove the row from the finished table
    finishedBody.removeChild(row);
}