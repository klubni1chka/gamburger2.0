const express = require('express');
const router = express.Router();
const tests = require("../models/curriculo-model");
const controller = require("../controllers/curriculo-controller");
router
    .route('/')
    .get((req, res, next) => {
        const qs = tests.test1.questions
        res.render('test', qs);
    })
    .post((req,res) => controller.saveAnswer(req,res))
    .post(controller.addUser)
module.exports = router;




const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password,12)
const user=new User({email,password:hashedPassword})