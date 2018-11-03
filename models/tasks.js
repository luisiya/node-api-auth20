const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA
const TaskSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    reminder: {
        type: Date
    }
}, {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'modifiedDate'
    }
});

mongoose.model("tasks", TaskSchema);