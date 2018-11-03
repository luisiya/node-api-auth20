
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA
const UserSchema = new Schema({
    googleID:{
        type:String,
        required:true
    },
    firstName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now

    },
    image:{
        type:String
    },


});

mongoose.model("users",UserSchema);