const mongoose = require('mongoose');

const TeammemberListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    
    designation: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

const TeammemberList = mongoose.model('TeammemberList', TeammemberListSchema);

module.exports = { TeammemberList };
