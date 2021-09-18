const express = require("express");
const app = express();
const { fstat, writeFileSync, appendFile } = require("fs");
const add = require('./routes/add')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const multer = require('multer');
const upload = multer();
const { toDoCallBack } = require('./controllers/toDoController')
const { toDoValidator } = require('./controllers/addController')
const { toDoEdit, getEdit } = require('./controllers/editController')
const toDoArray = require("./data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.get("/edit/:id", getEdit)

app.post("/todo/:id", toDoValidator, toDoEdit)

app.listen(3001)