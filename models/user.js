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
    roleNormalized: {
        type: String
    },
    company: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    companyNormalized: {
        type: String
    },
    currentStage: {
        type: String,
    },
    link: {
        type: String,
        trim: true
    },
    interviewLog: [logSchema]
}, {
    timestamps: true
})

const userSchema = new Schema({
    name: String,
    firstName: String,
    email: String,
    googleId: String,
    jobs: [jobSchema],
    interviewLog: [logSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
