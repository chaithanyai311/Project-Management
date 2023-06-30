const mongoose = require('mongoose');

const TeamListSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    totalMember: {
        type: Number,
        required: true,
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

const TeamList = mongoose.model('TeamList', TeamListSchema);

module.exports = { TeamList };
