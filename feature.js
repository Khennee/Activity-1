const TO_DO_BODY = document.getElementById('ADD_TO_DO');
const INPUT = document.getElementById('TYPE_WORD');

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
    document.getElementById('TYPE_WORD').value = ''; // resets the input field
    document.getElementById('TYPE_WORD').style.color = "black"; // resets the color to black
    document.getElementById('TYPE_WORD').classList.remove('REQUIRED_INPUT'); // removes the required input class

    document.getElementById('DUE_DATE').value = ''; // resets the due date input field
    document.getElementById('DUE_DATE').style.color = "black"; // resets the color to black
    document.getElementById('DUE_DATE').classList.remove('REQUIRED_INPUT'); // removes the required input class
}

//deletes a task
function removeTask(event) {
    const ROW = event.target.parentNode.parentNode;
    TO_DO_BODY.removeChild(ROW);
}

// document.getElementById('RESET_BUTTON').addEventListener('click', () => {
//     if (confirm('Are you sure you want to reset all data?')) {
//         // Clear all data
//         localStorage.clear();

//         // Clear the UI
//         document.getElementById('ADD_TO_DO').innerHTML = '';  // Clear the "To Do" list UI
//         document.getElementById('FINISHED_TABLE').innerHTML = '';  // Clear the "Finished" tasks UI

//         // Optionally, render to reflect the cleared state
//         renderTasks();
//         renderFinishedTasks();
//     }
// });
