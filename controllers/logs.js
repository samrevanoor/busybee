const User = require('../models/user');

function create(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            const job = user.jobs.id(req.params.id);
            console.log(req.body);
            req.body.interviewers.trim();
            req.body.contactInfo.trim();
            req.body.notes.trim();
            job.interviewLog.push(req.body);
            return user.save();
        })
        .then(function (user) {
            const job = user.jobs.id(req.params.id);
            return job;
        })
        .then(function (job) {
            console.log(job);
            res.redirect(`/jobs/${req.params.id}`)
        })
        .catch(function (err) {
            console.log("OH NO", err);
            res.redirect('/jobs')
        })
}

module.exports = {
    create
};