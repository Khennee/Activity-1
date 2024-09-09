const FINISHED_TABLE = document.getElementById('FINISHED_TABLE');


function finishToDo() {
    const ROWS = Array.from(TO_DO_BODY.children); 
    const ROWS_TO_REMOVE = [];

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

    ROWS.forEach((row) => {
        const DONE_BUTTON = row.querySelector('button');

        if (DONE_BUTTON.textContent === 'Done') {
            const TASK_CELLS = row.children;
            const TASK_NAME = TASK_CELLS[1].textContent;
            let taskDueDate = TASK_CELLS[3].textContent;

            if (taskDueDate.length === 16) {
                taskDueDate += ":00";
            }

            const FORMATTED_DUE_DATE = new Date(taskDueDate).toISOString(); // Store as ISO string

            // Get the current date as finishedDate and convert to ISO format
            const FINISHED_DATE = new Date().toISOString(); 

            const FINISHED_TASKS = {
                task: TASK_NAME,
                finishedDate: FINISHED_DATE, // Store the current date/time
                dueDate: FORMATTED_DUE_DATE   // Store due date properly
            };

            console.log("Task finished - taskName:", TASK_NAME);   
            console.log("Finished date stored:", FINISHED_DATE);  
            console.log("Formatted due date:", FORMATTED_DUE_DATE); 

            finishedTasks.push(FINISHED_TASKS);
            tasks = tasks.filter(task => task.task !== TASK_NAME || task.dueDate !== taskDueDate);
            ROWS_TO_REMOVE.push(row);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));

    ROWS_TO_REMOVE.forEach(row => TO_DO_BODY.removeChild(row));
    renderFinishedTasks(); 
}


function renderFinishedTasks() {
    const FINISHED_TABLE = document.getElementById('FINISHED_TABLE');
    let FINISHED_BODY = FINISHED_TABLE.getElementsByTagName('tbody')[0];

    if (!FINISHED_BODY) {
        FINISHED_BODY = document.createElement('tbody');
        FINISHED_TABLE.appendChild(FINISHED_BODY);
    }

    FINISHED_BODY.innerHTML = ''; // Clear existing rows

    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

    finishedTasks.forEach(task => {
        const FINISHED_ROW = document.createElement('tr');

        const FINISHED_TASK_TD = document.createElement('td');
        FINISHED_TASK_TD.textContent = task.task;
        FINISHED_TASK_TD.style.color = 'green'; 

        const STATUS_TD = document.createElement('td');
        STATUS_TD.textContent = 'Done';
        STATUS_TD.classList.add('STATUS')

        const DUE_DATE_TD = document.createElement('td');
        DUE_DATE_TD.textContent = new Date(task.dueDate).toLocaleString();

        const REMOVE_FINISHED_TD = document.createElement('td');
        const REMOVE_FINISHED_BUTTON = document.createElement('button');
        REMOVE_FINISHED_BUTTON.textContent = 'Delete';
        REMOVE_FINISHED_BUTTON.addEventListener('click', () => removeFinishedTask(task));
        REMOVE_FINISHED_TD.appendChild(REMOVE_FINISHED_BUTTON);

        FINISHED_ROW.appendChild(FINISHED_TASK_TD);
        FINISHED_ROW.appendChild(DUE_DATE_TD);
        FINISHED_ROW.appendChild(STATUS_TD);
        FINISHED_ROW.appendChild(REMOVE_FINISHED_TD);
        FINISHED_BODY.appendChild(FINISHED_ROW);
    });
}

console.log(localStorage.getItem('finishedTasks'));

function removeFinishedTask(taskToRemove) {
    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];
    finishedTasks = finishedTasks.filter(task => 
        task.task !== taskToRemove.task || 
        task.dueDate !== taskToRemove.dueDate || 
        task.finishedDate !== taskToRemove.finishedDate
    );
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));
    renderFinishedTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    const FINISHED_TABLE = document.getElementById('FINISHED_TABLE');
    if (FINISHED_TABLE) {
        renderFinishedTasks();
    } else {
        console.error('FINISHED_TABLE element not found');
    }
});