const express = require('express');
const mongoose = require('mongoose');

//DECODED TOKEN
const parseBearerToken = require("parse-bearer-token");
require("jsonwebtoken");
const nJwt = require("njwt");
const keys = require("../config/keys");

const router = express.Router();
require("../models/tasks.js");

//LOAD USER MODEL
const Tasks = mongoose.model("tasks");

//GET ALL TASKS OF USER
router.get("/", (req, res) => {
    const token = parseBearerToken(req);
    if (token) {
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
        Tasks.find({
            user:userID
        })
            .then(tasks => {
                res.send(JSON.stringify(tasks));
            })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

//ADD TASK TO USER
router.post("/add", (req, res) => {
    const token = parseBearerToken(req);
    if (token) {
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
        const newTask = new Tasks({
            title: req.body.title,
            description: req.body.description,
            color:req.body.color,
            deadline:req.body.deadline,
            reminder:req.body.reminder,
            user:userID
        });
        new Tasks(newTask)
            .save()
            .then(task => {
                res.send(JSON.stringify(task))
            })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

//CHANGE ONE TASK FROM USER
router.put("/:id", (req, res) => {
    const token = parseBearerToken(req);
    if (token) {
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
        const updateParams = req.body;
        Tasks.findOneAndUpdate(
        {_id:req.params.id},
            updateParams
        )
            .then(tasks => {
                res.send(JSON.stringify(tasks));
            })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

//DELETE ONE TASK FROM USER
router.delete("/:id", (req, res) => {
    const token = parseBearerToken(req);
    if (token) {
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
        Tasks.findOneAndDelete({
             user:userID,
            _id:req.params.id
        },
        //IF TASK NOT FOUND
            function(err) { console.log(err, "Task not found"); })

            .then(tasks => {
                res.send(JSON.stringify(tasks));
            })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

//DELETE ALL TASKS BY USERS
router.delete("/", (req, res) => {
    const token = parseBearerToken(req);
    if (token) {
        const verifyToken = nJwt.verify(token, keys.tokenSecret);
        const userID = verifyToken.body.sub;
        Tasks.find({
            user:userID,
        }).deleteMany()
            .then(tasks => {
                res.send(JSON.stringify(tasks));
            })
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;