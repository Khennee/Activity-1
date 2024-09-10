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
function resetInput() {
    document.getElementById('TYPE_WORD').value = ''; 
    document.getElementById('TYPE_WORD').style.color = "black"; 
    document.getElementById('TYPE_WORD').classList.remove('REQUIRED_INPUT'); 

    document.getElementById('DUE_DATE').value = ''; 
    document.getElementById('DUE_DATE').style.color = "black"; 
    document.getElementById('DUE_DATE').classList.remove('REQUIRED_INPUT'); 
}

function removeTask(event) {
    const ROW = event.target.parentNode.parentNode;
    TO_DO_BODY.removeChild(ROW);
}
