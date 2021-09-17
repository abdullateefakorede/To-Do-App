const { fstat, writeFileSync, appendFile } = require("fs");
const path = require('path');
const toDoArray = require("../data.json");
const { randomFunction } = require("../utils/common")
const addCallBack = (req, res) => {
    res.render("add")

}

const toDoValidator = (req, res, next) => {
    const dueAt = new Date(req.body.dueDate) || Date.now();
    if (!req.body.toDoName) {
        res.render('todo', {
            message: "Sorry, you didn't provide to-do name",
            type: "error"
        })
        return;
    }
    if (req.body.toDoName && (dueAt < Date.now())) {
        res.render('add', {
            message: "Sorry, you provided a past date!",
            type: "error"
        })
        return;
    }
    next();

}
const addPostCallBack = (req, res) => {
    const addUser = req.body;
    const createDate = new Date();
    const randomID = randomFunction(5);
    if (req.body.dueDate) {
        const dueDate = new Date(req.body.dueDate);
        Object.assign(addUser, { dueDate: dueDate.toISOString() })
    }
    let addDate = Object.assign(addUser, { create: createDate.toISOString() });
    let completedRefactor = Object.assign(addDate, { complete: false })
    let toDoDetails = Object.assign(completedRefactor, { ID: randomID });
    toDoArray.push(toDoDetails);
    console.log(process.cwd());
    const dataPath = path.join(process.cwd(), 'data.json')
    writeFileSync(dataPath, JSON.stringify(toDoArray, null, 4))
    res.redirect('/todo')
}

exports.addCallBack = addCallBack;
exports.toDoValidator = toDoValidator;
exports.addPostCallBack = addPostCallBack;