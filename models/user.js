const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    date: Date,
    interviewers: [String],
    contactInfo: [String],
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const jobSchema = new Schema({
    role: {
        type: String,
        required: true,
        maxlength: 35,
        trim: true
    },
    company: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    currentStage: {
        type: String,
    },
    link: {
        type: String,
        trim: true
    },
    interviewLog: [logSchema]
})

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    jobs: [jobSchema],
    interviewLog: [logSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
