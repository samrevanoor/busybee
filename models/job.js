const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const stageSchema = new Schema({
//     stageNumber: {
//         type: Number,
//         unique: true,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     complete: Boolean
// })

const jobSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    totalStages: Number,
    currentStage: {
        type: Number,
    },
    notes: String,
    // user: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Job', jobSchema);
