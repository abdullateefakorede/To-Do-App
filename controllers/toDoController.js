const toDoArray = require("../data.json");

const formatComplete = (complete) => complete ? 'Yes' : 'No'

function formatArray(array) {
    const trueArray = array.filter(element => element.complete === true)
    const falseArray = array.filter(element => element.complete === false)
    return falseArray.concat(trueArray);
}

const toDoCallBack = (req, res) => {
    res.render("todo", {
        toDoArray: formatArray(toDoArray),
        formatComplete
    })
}

exports.toDoCallBack = toDoCallBack;