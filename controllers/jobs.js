const Job = require('../models/job');

function index(req, res, next) {
    // let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // let sortKey = req.query.sort || 'name';
    Job.find({})
        // .sort(sortKey).exec
        .then(function (jobs) {
            res.render('jobs/index', {
                jobs,
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
    const job = new Job(req.body);
    job.save()
        .then(function (job) {
            console.log(job);
            res.redirect(`/jobs`);
        })
        .catch(function (err) {
            res.redirect('/jobs/new');
        })
};

function show(req, res) {
    Job.findById(req.params.id)
        .then(function (job) {
            console.log(job);
            res.render('jobs/show', { title: 'Job Detail', job });
        })
        .catch(function (err) {
            res.redirect('/jobs')
        })
};

function deleteJob(req, res) {
    Job.findByIdAndDelete(req.params.id)
        .then(function () {
            res.redirect('/jobs')
        })
        .catch(function () {
            console.log("OH NO");
            res.redirect('/jobs')
        })
}

function addStage(req, res) {
    Job.findById(req.params.id)
        .then(function (job) {
            console.log("addStage: ", req.body);
            job.stages.push(req.body);
            return job.save();
        })
        .then(function () {
            res.redirect('/jobs/:id');
        })
        .catch(function (err) {
            console.log("OH NO");
            res.redirect('/jobs/:id');
        });
}

module.exports = {
    index,
    new: newJob,
    create,
    show,
    delete: deleteJob,
    addStage
}