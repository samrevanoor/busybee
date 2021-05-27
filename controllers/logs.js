const User = require('../models/user');

function create(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            const job = user.jobs.id(req.params.id);
            req.body.interviewers = req.body.interviewers.trim().replace(/\s*,\s*/g, ',').split(',');
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
            res.redirect(`/jobs/${req.params.id}`)
        })
        .catch(function (err) {
            res.redirect('/jobs')
        })
}

module.exports = {
    create
};