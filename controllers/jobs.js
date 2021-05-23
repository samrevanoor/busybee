const User = require('../models/user');

function index(req, res, next) {
    // let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // let sortKey = req.query.sort || 'name';
    User.findById(req.user.id)
        // .sort(sortKey).exec
        .then(function (user) {
            res.render('jobs/index', {
                user,
                // name: req.query.name,
                // sortKey,
                title: "my buzz feed"
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
            req.body.generalNotes.trim();
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

// function updateStage(req, res) {
//     Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(function () {
//             console.log("addStage: ", req.body);
//             res.redirect('/jobs/:id');
//         })
//         .catch(function (err) {
//             console.log("OH NO");
//             res.redirect('/jobs/:id');
//         });
// }

module.exports = {
    index,
    new: newJob,
    create,
    show,
    delete: deleteJob,
    editJob,
    updateJob
}