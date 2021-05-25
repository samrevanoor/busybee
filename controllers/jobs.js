const User = require('../models/user');

function index(req, res, next) {
    User.findById(req.user.id)
        .then(function (user) {
            return user.jobs.sort((a, b) => {
                const aDate = new Date(a.updatedAt);
                const bDate = new Date(b.updatedAt);

                if (aDate < bDate) return 1;
                if (aDate > bDate) return -1;

                return 0;
            });
        })
        .then(function (jobs) {
            res.render('jobs/index', {
                jobs,
                name: req.user.firstName,
                sortKey: "last updated",
                title: "your buzz feed"
            })
        })
        .catch(function (err) {
            return next(err)
        });
};

function newJob(req, res) {
    res.render('jobs/new', {
        title: "add a new job",
    })
};

function create(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            console.log(user.jobs);
            req.body.role.trim();
            req.body.company.trim();
            req.body.link.trim();
            user.jobs.push(req.body);
            console.log(user.jobs)
            return user.save()
        })
        .then(function () {
            res.redirect(`/jobs`);
        })
        .catch(function (err) {
            console.log("OH NO: ", err);
            res.redirect('/jobs');
        })
};

function show(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            return user.jobs.id(req.params.id)
        })
        .then(function (job) {
            console.log(job);
            res.render('jobs/show', { title: 'job details', job });
        })
        .catch(function (err) {
            res.redirect('/jobs')
        })
};

function deleteJob(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            user.jobs.id(req.params.id).remove();
            return user.save();
        })
        .then(function () {
            res.redirect('/jobs')
        })
        .catch(function (err) {
            console.log("OH NO");
            res.redirect('/jobs')
        })
}

function editJob(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            return user.jobs.id(req.params.id);
        })
        .then(function (job) {
            res.render('jobs/edit', { title: 'edit job', job })
        })
        .catch(function (err) {
            console.log("OH NO");
            res.redirect(`/jobs/${req.params.id}`)
        })
}

function updateJob(req, res) {
    const editedValue = req.body;
    User.findById(req.user.id)
        .then(function (user) {
            const job = user.jobs.id(req.params.id);
            job.set(editedValue);
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
            console.log("OH NO");
            res.redirect('/jobs')
        })
}

function sort(req, res, next) {
    User.findById(req.user.id)
        .then(function (user) {
            const sortKey = req.query.sortKey;
            if (sortKey === "role A-Z") {
                return user.jobs.sort((a, b) => {
                    const aRole = a.role;
                    const bRole = b.role;

                    if (aRole < bRole) return -1;
                    if (aRole > bRole) return 1;

                    return 0
                });
            } else if (sortKey === "role Z-A") {
                return user.jobs.sort((a, b) => {
                    const aRole = a.role;
                    const bRole = b.role;

                    if (aRole < bRole) return 1;
                    if (aRole > bRole) return -1;

                    return 0
                });
            } else if (sortKey === "company A-Z") {
                return user.jobs.sort((a, b) => {
                    const aCompany = a.company;
                    const bCompany = b.company;

                    if (aCompany < bCompany) return -1;
                    if (aCompany > bCompany) return 1;

                    return 0
                });
            } else if (sortKey === "company Z-A") {
                return user.jobs.sort((a, b) => {
                    const aCompany = a.company;
                    const bCompany = b.company;

                    if (aCompany < bCompany) return 1;
                    if (aCompany > bCompany) return -1;

                    return 0
                });
            } else if (sortKey === "latest stage") {
                return user.jobs.sort((a, b) => {
                    const aStage = a.currentStage;
                    const bStage = b.currentStage;

                    if (aStage < bStage) return 1;
                    if (aStage > bStage) return -1;

                    return 0
                });
            } else if (sortKey === "earliest stage") {
                return user.jobs.sort((a, b) => {
                    const aStage = a.currentStage;
                    const bStage = b.currentStage;

                    if (aStage < bStage) return -1;
                    if (aStage > bStage) return 1;

                    return 0
                });
            } else {
                sortKey === "last updated";
                return user.jobs.sort((a, b) => {
                    const aUpdatedAt = a.updatedAt;
                    const bUpdatedAt = b.updatedAt;

                    if (aUpdatedAt < bUpdatedAt) return 1;
                    if (aUpdatedAt > bUpdatedAt) return -1;

                    return 0
                });
            }
        })
        .then(function (jobs) {
            res.render('jobs/index', {
                jobs,
                sortKey: req.query.sortKey,
                name: req.user.firstName,
                title: "your buzz feed"
            })
        })
        .catch(function (err) {
            console.log("OH NO", err);
            res.redirect('/jobs')
        });
};

module.exports = {
    index,
    new: newJob,
    create,
    show,
    delete: deleteJob,
    editJob,
    updateJob,
    sort
}