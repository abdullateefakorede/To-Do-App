const express = require('express');
const router = express.Router();
const { addCallBack, toDoValidator, addPostCallBack } = require('../controllers/addController');
const toDoArray = require("../data.json");

router.get('/', addCallBack);
router.post('/todo', toDoValidator, addPostCallBack);

module.exports = router;