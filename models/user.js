const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    currentStage: {
        type: String,
    },
    link: String,
    notes: String,
})

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    jobs: [jobSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
