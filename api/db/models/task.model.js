const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    projectName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    teamName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }

});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = { TaskList };
