// Add event listener to the "Add" button
const ADD_BUTTON = document.getElementById('ADD_BUTTON');
ADD_BUTTON.addEventListener('click', addToDo);

document.getElementById('NEAREST_BUTTON').addEventListener('click', () => sortTasks(true)); // Sort by nearest due date
document.getElementById('LATEST_BUTTON').addEventListener('click', () => sortTasks(false)); // Sort by latest due date

// Add this interval check when the page loads
setInterval(() => checkPastDueTasks(document.getElementById('ADD_TO_DO')), 30000);

// Function to add a task to the "To Do" list
function addToDo() {
    console.log("addToDo function called");
    const INPUT_VALUE = document.getElementById('TYPE_WORD').value;
    const DUE_DATE_INPUT = document.getElementById('DUE_DATE').value;

    // Validate input
    if (INPUT_VALUE === "" || INPUT_VALUE === "- - - - - - - - required input - - - - - - - -") {
        document.getElementById('TYPE_WORD').style.color = "red";
        document.getElementById('TYPE_WORD').classList.add('REQUIRED_INPUT');
        document.getElementById('TYPE_WORD').value = "- - - - - - - - required input - - - - - - - -";
        return;
    }

    if (DUE_DATE_INPUT === "") {
        document.getElementById('DUE_DATE').style.color = "red";
        document.getElementById('DUE_DATE').classList.add('REQUIRED_INPUT');
        document.getElementById('DUE_DATE').value = "- - - - - - - - required input - - - - - - - -";
        return;
    }

    // Create a new task object
    const TASK = {
        task: INPUT_VALUE,
        dueDate: DUE_DATE_INPUT,
        dateCreated: new Date().toISOString()
    };

    // Fetch tasks and finishedTasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

    console.log("Current tasks:", tasks);
    console.log("Current finished tasks:", finishedTasks);

    // Ensure task is not already finished
    const isTaskFinished = finishedTasks.some(finishedTask => 
        finishedTask.task === TASK.task && finishedTask.dueDate === TASK.dueDate
    );

    if (isTaskFinished) {
        alert("This task is already marked as finished.");
        return; // Do not add the task to "To Do" list if it's already finished
    }

    tasks.push(TASK);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Reset the input fields after task is added
    resetInput();

    // Re-render the tasks list to reflect the new task
    renderTasks();
}

function renderTasks() {
    const TO_DO_BODY = document.getElementById('ADD_TO_DO');
    TO_DO_BODY.innerHTML = ''; // Clear the current "To Do" list

    // Fetch tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];

    // Filter out tasks that are already finished
    const remainingTasks = tasks.filter(task => {
        return !finishedTasks.some(finishedTask => 
            finishedTask.task === task.task && finishedTask.dueDate === task.dueDate
        );
    });

    // Render the remaining tasks
    remainingTasks.forEach(task => {
        const ROW = document.createElement('tr'); // Create a new tr element
        const TASK_TD = document.createElement('td');
        TASK_TD.textContent = task.task.length > 15 ? task.task.slice(0, 15) + '...' : task.task;

        const DATE_TD = document.createElement('td');
        DATE_TD.textContent = new Date(task.dateCreated).toLocaleString();

        const DUE_DATE_TD = document.createElement('td');
        DUE_DATE_TD.textContent = new Date(task.dueDate).toLocaleString();

        const DONE_TD = document.createElement('td');
        const DONE_BUTTON = document.createElement('button');
        DONE_BUTTON.textContent = 'Done';
        DONE_BUTTON.addEventListener('click', () => {

            addTaskToFinishedTable(task);

            removeTaskFromStorage(task);
        });
        DONE_BUTTON.classList.add('DONE_BTN');
        DONE_TD.appendChild(DONE_BUTTON);

        const REMOVE_TD = document.createElement('td');
        const REMOVE_BUTTON = document.createElement('button');
        REMOVE_BUTTON.textContent = 'Delete';
        REMOVE_BUTTON.addEventListener('click', () => removeTaskFromStorage(task));
        REMOVE_BUTTON.classList.add('REMOVE_BTN');
        REMOVE_TD.appendChild(REMOVE_BUTTON);

        ROW.appendChild(DONE_TD);
        ROW.appendChild(TASK_TD);
        ROW.appendChild(DATE_TD);
        ROW.appendChild(DUE_DATE_TD);
        ROW.appendChild(REMOVE_TD);

        TO_DO_BODY.appendChild(ROW); 
    });
}


function removeTaskFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !(task.task === taskToRemove.task && task.dueDate === taskToRemove.dueDate && task.dateCreated === taskToRemove.dateCreated));
    console.log(`Removed task: ${taskToRemove.task} with due date: ${taskToRemove.dueDate}`);
    console.log(`Tasks array after removal: ${JSON.stringify(tasks)}`);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function resetInput() {
    document.getElementById('TYPE_WORD').value = '';
    document.getElementById('DUE_DATE').value = '';
    document.getElementById('TYPE_WORD').style.color = '';
    document.getElementById('DUE_DATE').style.color = '';
}

renderTasks();

// Function to check all tasks if any are past their due date
function checkPastDueTasks() {
    const TO_DO_BODY = document.getElementById('ADD_TO_DO');
    const TASKS = TO_DO_BODY.children;

    for (let i = 0; i < TASKS.length; i++) {
        const DUE_DATE_TD = TASKS[i].children[3]; 
        const DUE_DATE_STRING = DUE_DATE_TD.textContent;
        const DUE_DATE = new Date(DUE_DATE_STRING);

        const TODAY = new Date();
        if (DUE_DATE < TODAY) {
            TASKS[i].children[1].style.color = "red"; // Task name
            DUE_DATE_TD.style.color = "red"; // Due date
        } else {
            TASKS[i].children[1].style.color = ""; // Reset task name color
            DUE_DATE_TD.style.color = ""; // Reset due date color
        }
    }
}
// Function to sort tasks by nearest or latest due date
function sortTasks(isNearest) {
    const TO_DO_BODY = document.getElementById('ADD_TO_DO');
    const TASKS_ARRAY = Array.from(TO_DO_BODY.children);

    TASKS_ARRAY.sort((taskA, taskB) => {
        const DUE_DATE_A = new Date(taskA.children[3].textContent); 
        const DUE_DATE_B = new Date(taskB.children[3].textContent);

        return isNearest ? DUE_DATE_A - DUE_DATE_B : DUE_DATE_B - DUE_DATE_A; // Ascending if nearest, descending if latest
    });

    // Clear the current task list and append the sorted tasks
    TO_DO_BODY.innerHTML = ''; // Clear current task list
    TASKS_ARRAY.forEach(task => TO_DO_BODY.appendChild(task)); // Add sorted tasks back to the list
} 


function addTaskToFinishedTable(task) {
    console.log("ADD TASK TO FINSISHED TABLE CALLED")
    const FINISHED_TABLE = document.getElementById('FINISHED_TABLE');
    const FINISHED_BODY = FINISHED_TABLE.getElementsByTagName('tbody')[0]; // Get the tbody element
    if (!FINISHED_BODY) { // If tbody doesn't exist, create it
        FINISHED_BODY = document.createElement('tbody');
        FINISHED_TABLE.appendChild(FINISHED_BODY);
    }

    const ROW = document.createElement('tr');
    const TASK_TD = document.createElement('td');
    TASK_TD.textContent = task.task.length > 15 ? task.task.slice(0, 15) + '...' : task.task;

    const DATE_TD = document.createElement('td');
    DATE_TD.textContent = new Date(task.dateCreated).toLocaleString();

    const DUE_DATE_TD = document.createElement('td');
    DUE_DATE_TD.textContent = new Date(task.dueDate).toLocaleString();

    ROW.appendChild(TASK_TD);
    ROW.appendChild(DATE_TD);
    ROW.appendChild(DUE_DATE_TD);

    FINISHED_BODY.appendChild(ROW); 
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.task !== task.task || t.dueDate !== task.dueDate);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add the finished task to the finishedTasks array
    let finishedTasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];
    finishedTasks.push(task);
    localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks));

    renderFinishedTasks();

    renderTasks();
}