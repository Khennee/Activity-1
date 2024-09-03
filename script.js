// initialized from html
const addBtn = document.getElementById('ADD_BUTTON');
const todoBody = document.getElementById('ADD_TO_DO');
const doneBtn = document.getElementById('DONE_BUTTON');
const finishedBody = document.getElementById('FINISHED_TASKS');
const inputField = document.getElementById('TYPE_WORD');
const selectAllCheckboxes = document.getElementById('SELECT_ALL_CHECKBOXES')

//resets the input when focused
inputField.addEventListener('focus', resetInput);
//we can use the enter key when adding to the to do table instead of the add button
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addToDo();
    }
});
//checks if the input value is equal to this type of value, if it does it resets to a blank state
function resetInput() {
    const inputValue = inputField.value;
    if (inputValue === "- - - - - - - - required input - - - - - - - -") {
        inputField.value = "";
        inputField.style.color = "black";
        inputField.classList.remove('REQUIRED_INPUT');
    }
    
}
// adds the task to the table
addBtn.addEventListener('click', addToDo);

//add task function
function addToDo() {
    //gets the value of the input field
    const inputValue = document.getElementById('TYPE_WORD').value;
    //check if there is a value in the input field
    // if it doest it returns the -- required input--
    if  (inputValue === "" || inputValue === "- - - - - - - - required input - - - - - - - -"){
        // document.getElementById('TYPE_WORD').value = "";
        document.getElementById('TYPE_WORD').style.color = "red";
        document.getElementById('TYPE_WORD').classList.add('REQUIRED_INPUT');
        document.getElementById('TYPE_WORD').value = "- - - - - - - - required input - - - - - - - -";
        return;
    } 
    //will reset the field
    resetInput()
    //creates a new table 
    const row = document.createElement('tr');
    const checkboxTd = document.createElement('td'); //for the checkbox
    const checkbox = document.createElement('input');
    
    //the new input will be checkbox
    checkbox.type = 'checkbox';
    checkboxTd.appendChild(checkbox);

    //creates a table for the tasks
    const taskTd = document.createElement('td');
    taskTd.textContent = inputValue; //getting from the input field on what to append

    //create a new table for the date
    const dateTd = document.createElement('td');//row for the date
    const date = new Date();
    const formattedDate = date.toDateString();
    dateTd.textContent = formattedDate;

    //creates a table for the delete/remove button
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete'; //name of the button (surface)
    removeBtn.addEventListener('click', removeTask); //clickable delete button
    removeBtn.classList.add('REMOVE_BTN'); //css
    removeTd.appendChild(removeBtn);//adds delete button to the table

    // add all the needs for the table
    row.appendChild(checkboxTd); 
    row.appendChild(taskTd);
    row.appendChild(dateTd);
    row.appendChild(removeTd);

    todoBody.appendChild(row);//creates a row with the input

    document.getElementById('TYPE_WORD').value = '';//resets to an empty string
}

//deletes a task
function removeTask(event) {
    const row = event.target.parentNode.parentNode;
    todoBody.removeChild(row);
}
//done button for finished task 
doneBtn.addEventListener('click', finishToDo);

function finishToDo() {
    const rows = todoBody.children;
    //loop from the to do table
    let i = 0;
    while (i < rows.length) {
        const checkbox = rows[i].children[0].children[0];
        
        
        if (checkbox.checked) { //checks if the checkbox is checks :)
            const finishedRow = document.createElement('tr');//new table row
            const finishedTaskTd = document.createElement('td');//new table data cell
            finishedTaskTd.textContent = rows[i].children[1].textContent;//to do -> finished
            finishedTaskTd.classList.add('FINISHED');//css

            //date for the finished task
            const finishedDateTd = document.createElement('td');//row for the date
            const finishedDate = new Date();
            const formattedFinishedDate = finishedDate.toDateString();
            finishedDateTd.textContent = formattedFinishedDate;
        
            const finishedRemoveTd = document.createElement('td');//create table cell
            const finishedRemoveBtn = document.createElement('button');//ceate button
            finishedRemoveBtn.textContent = 'Delete';//button name
            finishedRemoveBtn.addEventListener('click', removeFinishedTask);//when clicked it removes
            finishedRemoveTd.appendChild(finishedRemoveBtn);//add button

            finishedRow.appendChild(finishedTaskTd);//adds the finished task
            finishedRow.appendChild(finishedDateTd);//date
            finishedRow.appendChild(finishedRemoveTd);//delete button
            finishedBody.appendChild(finishedRow);//adds new row to finished table 
            todoBody.removeChild(rows[i]);//removes the main task from to do list

        } else {
            i++;//if condition not met increment by 1
        }
    }
}

//removes a finished task from the finished table
function removeFinishedTask(event) {
    const row = event.target.parentNode.parentNode;//finds the row
    finishedBody.removeChild(row);//deletes row
}
//select all function 
function selectAll() {
    let checkboxes = todoBody.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {//looping through all the list
        checkbox.checked = selectAllCheckboxes.checked;
    })
}