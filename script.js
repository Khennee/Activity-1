const addBtn = document.getElementById('ADD_BUTTON');
const todoBody = document.getElementById('ADD_TO_DO');
const doneBtn = document.getElementById('DONE_BUTTON');
const finishedBody = document.getElementById('FINISHED_TASKS');
const inputField = document.getElementById('TYPE_WORD');

inputField.addEventListener('focus', resetInput);

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

addBtn.addEventListener('click', addTask);

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
    
    const row = document.createElement('tr');
    const checkboxTd = document.createElement('td');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkboxTd.appendChild(checkbox);

    const taskTd = document.createElement('td');
    taskTd.textContent = inputValue;

    const dateTd = document.createElement('td');
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    dateTd.textContent = formattedDate;

    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete';
    removeBtn.addEventListener('click', removeTask);
     removeBtn.classList.add('REMOVE_BTN');
    removeTd.appendChild(removeBtn);

    row.appendChild(checkboxTd);
    row.appendChild(taskTd);
    row.appendChild(dateTd);
    row.appendChild(removeTd);

    todoBody.appendChild(row);

    document.getElementById('TYPE_WORD').value = '';
}

function removeTask(event) {
    const row = event.target.parentNode.parentNode;

    todoBody.removeChild(row);
}

doneBtn.addEventListener('click', finishTasks);

function finishTasks() {
    const rows = todoBody.children;

    for (let i = 0; i < rows.length; i++) {
        const checkbox = rows[i].children[0].children[0];

        if (checkbox.checked) {
            const finishedRow = document.createElement('tr');
            const finishedTaskTd = document.createElement('td');
            finishedTaskTd.textContent = rows[i].children[1].textContent;
            finishedTaskTd.classList.add('FINISHED');

            const finishedDateTd = document.createElement('td');
            const finishedDate = new Date();
            const formattedFinishedDate = finishedDate.toLocaleDateString();
            finishedDateTd.textContent = formattedFinishedDate;
        
            const finishedRemoveTd = document.createElement('td');
            const finishedRemoveBtn = document.createElement('button');
            finishedRemoveBtn.textContent = 'Delete';
            finishedRemoveBtn.addEventListener('click', removeFinishedTask);
            finishedRemoveTd.appendChild(finishedRemoveBtn);

            finishedRow.appendChild(finishedTaskTd);
            finishedRow.appendChild(finishedDateTd);
            finishedRow.appendChild(finishedRemoveTd);

            finishedBody.appendChild(finishedRow);

            todoBody.removeChild(rows[i]);
        
            i--;
        }
    }
}

function removeFinishedTask(event) {
    const row = event.target.parentNode.parentNode;
    finishedBody.removeChild(row);
}