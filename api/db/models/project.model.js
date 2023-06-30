const mongoose = require('mongoose');

const ProjectListSchema = new mongoose.Schema({
    projectName: {
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
    },
    teamName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }

});

const ProjectList = mongoose.model('ProjectList', ProjectListSchema);

module.exports = { ProjectList };
