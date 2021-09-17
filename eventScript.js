function frontendValidator() {
    const dateInput = document.getElementById('dateinput');
    const dateError = document.getElementById('dateerror');
    const addButton = document.getElementById('addbutton');
    const dateValue = dateInput.value;
    // console.log(dateValue)

    const dueAt = new Date(dateValue) || Date.now();
    if (!dueAt || (dueAt < Date.now())) {
        dateError.style.display = "inline-block";
        addButton.style.display = "none";
    } else {
        dateError.style.display = "none";
        addButton.style.display = "inline-block";

    }
}