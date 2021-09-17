const express = require("express");
const app = express();
const path = require('path');
const { fstat, writeFileSync, appendFile } = require("fs");
const add = require('./routes/add')
const { checkedFunction } = require("./utils/common")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require('multer');
const upload = multer();
const { toDoCallBack } = require('./controllers/toDoController')
const toDoArray = require("./data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'Your Secret Key',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/add', add)
app.get("/todo", toDoCallBack)
app.post("/todo", toDoCallBack)

app.get("/edit/:id", (req, res) => {
    const test = toDoArray.filter((element) => {
        return element.ID === req.params.id
    });
    if (test.length === 0) {
        return res.render("error", { type: "error", message: "Page Not Found" })
    }
    res.render("edit", { toDoArray: test, checkedFunction })
})

app.post("/todo/:id", (req, res) => {
    const id = req.params.id;
    const idIndex = toDoArray.findIndex((element) => {
        return element.ID === req.params.id
    });
    console.log(req.body);
    if (req.body.completed === "yes" || req.body.completed === "true") {
        toDoArray[idIndex].complete = true;
        const dataPath = path.join(process.cwd(), 'data.json')
        writeFileSync(dataPath, JSON.stringify(toDoArray, null, 4))
        res.redirect("/todo")
        return
    }
    toDoArray[idIndex].complete = false;
    const dataPath = path.join(process.cwd(), 'data.json')
    writeFileSync(dataPath, JSON.stringify(toDoArray, null, 4))
    res.redirect("/todo")
})

app.listen(3001)