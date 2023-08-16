const mongoose = require("mongoose");

const questionNodeSchema = mongoose.Schema({
    questions: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const QuestionNode = mongoose.model('QuestionNode', questionNodeSchema);
module.exports = QuestionNode;
