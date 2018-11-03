const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require("../models/user.js");

//LOAD USER MODEL
const User = mongoose.model("users");

router.get("/", (req, res) => {
    User.find({})
        .then(users => {
            res.send(JSON.stringify(users));
        })
});

router.get("/:id", (req, res) => {
    User.findOne({
        _id: req.params.id
    })
        .then(user => {
            res.send(JSON.stringify(user));
        })
});


router.delete("/", (req, res) => {
    res.send("Invalid message or user does not have permission to delete user");
});

module.exports = router;