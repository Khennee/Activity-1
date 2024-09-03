// initialized from html
const ADD_BUTTON = document.getElementById('ADD_BUTTON');
const TO_DO_BODY = document.getElementById('ADD_TO_DO');
const DONE_BUTTON = document.getElementById('DONE_BUTTON');
const FINISHED_BODY = document.getElementById('FINISHED_TASKS');
const INPUT = document.getElementById('TYPE_WORD');
const SELECT_ALL_CHECKBOXES = document.getElementById('SELECT_ALL_CHECKBOXES')

//resets the input when focused
INPUT.addEventListener('focus', resetInput);
//we can use the enter key when adding to the to do table instead of the add button
INPUT.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addToDo();
    }
});
//checks if the input value is equal to this type of value, if it does it resets to a blank state
function resetInput() {
    const INPUT_VALUE = INPUT.value;
    if (INPUT_VALUE === "- - - - - - - - required input - - - - - - - -") {
        INPUT.value = "";
        INPUT.style.color = "black";
        INPUT.classList.remove('REQUIRED_INPUT');
    }
    
}
// adds the task to the table
ADD_BUTTON.addEventListener('click', addToDo);

//add task function
function addToDo() {
    //gets the value of the input field
    const INPUT_VALUE = document.getElementById('TYPE_WORD').value;
    //check if there is a value in the input field
    // if it doest it returns the -- required input--
    if  (INPUT_VALUE === "" || INPUT_VALUE === "- - - - - - - - required input - - - - - - - -"){
        // document.getElementById('TYPE_WORD').value = "";
        document.getElementById('TYPE_WORD').style.color = "red";
        document.getElementById('TYPE_WORD').classList.add('REQUIRED_INPUT');
        document.getElementById('TYPE_WORD').value = "- - - - - - - - required input - - - - - - - -";
        return;
    } 
    //will reset the field
    resetInput()
    //creates a new table 
    const ROW = document.createElement('tr');
    const CHECKBOX_TD = document.createElement('td'); //for the checkbox
    const CHECKBOX = document.createElement('input');
    
    //the new input will be checkbox
    CHECKBOX.type = 'checkbox';
    CHECKBOX_TD.appendChild(CHECKBOX);

    //creates a table for the tasks
    const TASK_TD = document.createElement('td');
    TASK_TD.textContent = INPUT_VALUE; //getting from the input field on what to append

    //create a new table for the date
    const DATE_TD = document.createElement('td');//row for the date
    const DATE = new Date();
    const DATE_FORMAT = DATE.toDateString();
    DATE_TD.textContent = DATE_FORMAT;

    //creates a table for the delete/remove button
    const REMOVE_TD = document.createElement('td');
    const REMOVE_BUTTON = document.createElement('button');
    REMOVE_BUTTON.textContent = 'Delete'; //name of the button (surface)
    REMOVE_BUTTON.addEventListener('click', removeTask); //clickable delete button
    REMOVE_BUTTON.classList.add('REMOVE_BTN'); //css
    REMOVE_TD.appendChild(REMOVE_BUTTON);//adds delete button to the table

    // add all the needs for the table
    ROW.appendChild(CHECKBOX_TD); 
    ROW.appendChild(TASK_TD);
    ROW.appendChild(DATE_TD);
    ROW.appendChild(REMOVE_TD);

    TO_DO_BODY.appendChild(ROW);//creates a row with the input

    document.getElementById('TYPE_WORD').value = '';//resets to an empty string
}

//deletes a task
function removeTask(event) {
    const ROW = event.target.parentNode.parentNode;
    TO_DO_BODY.removeChild(ROW);
}
//done button for finished task 
DONE_BUTTON.addEventListener('click', finishToDo);

function finishToDo() {
    const ROWS = TO_DO_BODY.children;
    //loop from the to do table
    let i = 0;
    while (i < ROWS.length) {
        const CHECKBOX = ROWS[i].children[0].children[0];
        
        
        if (CHECKBOX.checked) { //checks if the checkbox is checks :)
            const FINISHED_ROW = document.createElement('tr');//new table row
            const FINISHED_TASK_TD = document.createElement('td');//new table data cell
            FINISHED_TASK_TD.textContent = ROWS[i].children[1].textContent;//to do -> finished
            FINISHED_TASK_TD.classList.add('FINISHED');//css

            //date for the finished task
            const FINISHED_DATE_TD = document.createElement('td');//row for the date
            const FINISHED_DATE = new Date();
            const FINISHED_DATE_FORMAT = FINISHED_DATE.toDateString();
            FINISHED_DATE_TD.textContent = FINISHED_DATE_FORMAT;
        
            const REMOVE_FINISHED_TD = document.createElement('td');//create table cell
            const REMOVE_FINISHED_BUTTON = document.createElement('button');//ceate button
            REMOVE_FINISHED_BUTTON.textContent = 'Delete';//button name
            REMOVE_FINISHED_BUTTON.addEventListener('click', removeFinishedTask);//when clicked it removes
            REMOVE_FINISHED_TD.appendChild(REMOVE_FINISHED_BUTTON);//add button

            FINISHED_ROW.appendChild(FINISHED_TASK_TD);//adds the finished task
            FINISHED_ROW.appendChild(FINISHED_DATE_TD);//date
            FINISHED_ROW.appendChild(REMOVE_FINISHED_TD);//delete button
            FINISHED_BODY.appendChild(FINISHED_ROW);//adds new row to finished table 
            TO_DO_BODY.removeChild(ROWS[i]);//removes the main task from to do list

            SELECT_ALL_CHECKBOXES.checked = false;
        } else {
            i++;//if condition not met increment by 1
        }
    }
}

//removes a finished task from the finished table
function removeFinishedTask(event) {
    const ROW = event.target.parentNode.parentNode;//finds the row
    FINISHED_BODY.removeChild(ROW);//deletes row
}

SELECT_ALL_CHECKBOXES.addEventListener('change', selectAll);
//select all function
function selectAll() {
    let checkboxes = TO_DO_BODY.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(CHECKBOX => {//looping throught the list
        CHECKBOX.checked = SELECT_ALL_CHECKBOXES.checked;
    })
}