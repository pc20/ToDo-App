const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    }
});

const todo = mongoose.model('ToDo',taskSchema);

module.exports = todo;