function randomFunction(value) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < value; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function checkedFunction() {
    const radioButtons = document.getElementsByName('completed');
    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].value) {
            console.log(radioButtons[i].value)
            document.getElementById("yesId").checked = true;
            return
        }
        document.getElementById("noId").checked = true;
    }
}

exports.randomFunction = randomFunction;
exports.checkedFunction = checkedFunction;