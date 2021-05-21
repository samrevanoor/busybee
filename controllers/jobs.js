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
        title: "Add a new job",
    })
};

function create(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            console.log(user.jobs)
            user.jobs.push(req.body);
            console.log(user.jobs)
            return user.save()
        })
        .then(function () {
            res.redirect(`/jobs`);
        })
        .catch(function (err) {
            res.redirect('/jobs/new');
        })
};

function show(req, res) {
    User.findById(req.user.id)
        .then(function (user) {
            return user.jobs.id(req.params.id)
        })
        .then(function (job) {
            console.log(job);
            res.render('jobs/show', { title: 'job detail', job });
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
        .catch(function () {
            console.log("OH NO");
            res.redirect('/jobs')
        })
}

// function editJob(req, res) {
//     res.render('jobs/edit', {
//         job: Job.getOne(req.params.id)
//     })
// }

// function updateJob(req, res) {
//     const updatedValue = req.body;
//     Job.updateOne(req.body, req.params.id);
//     res.render('jobs/show', {
//         job: Job.getOne(req.params.id),
//     })
// }

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
    // editJob,
    // updateJob
}