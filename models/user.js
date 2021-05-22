const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    notes: {
        type: String,
        trim: true
    }
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
