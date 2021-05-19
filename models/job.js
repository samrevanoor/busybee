const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
    stageNumber: Number,
    name: {
        type: String,
        required: true
    },
    complete: Boolean
})

const jobSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    stages: stageSchema,
    notes: String
})

module.exports = mongoose.model('Job', movieSchema);
