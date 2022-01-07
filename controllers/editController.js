const toDoArray = require("../data.json");
const path = require('path');
const { fstat, writeFileSync, appendFile } = require("fs");


const getEdit = (req, res) => {
    const test = toDoArray.filter((element) => {
        return element.ID === req.params.id
    });
    if (test.length === 0) {
        return res.render("error", { type: "error", message: "Page Not Found" })
    }
    res.render("editform", { toDoArray: test })
}

const toDoEdit = (req, res) => {
    console.log(req.body.dueDate);
    const idIndex = toDoArray.findIndex(element => element.ID === req.params.id);
    if (req.body.dueDate) {
        const dueDate = new Date(req.body.dueDate);
        toDoArray[idIndex].dueDate = dueDate.toISOString();
    }
    if (req.body.completed === "yes" || req.body.completed === "true") {
        toDoArray[idIndex].complete = true;
    } else {
        toDoArray[idIndex].complete = false;
    }
    toDoArray[idIndex].toDoName = req.body.toDoName;
    console.log(process.cwd())
    const dataPath = path.join(process.cwd(), 'data.json');
    writeFileSync(dataPath, JSON.stringify(toDoArray, null, 4));
    res.redirect("/todo")
}


exports.toDoEdit = toDoEdit;
exports.getEdit = getEdit;
