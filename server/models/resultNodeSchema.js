const mongoose = require("mongoose");

const resultNodeSchema = mongoose.Schema({
    username: {
        type: String
    },
    result: {
        type: Array,
        default: []
    },
    attempts: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    achieved: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

const ResultNode = mongoose.model('ResultNode', resultNodeSchema);
module.exports = ResultNode;
