const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jobs',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

// shortcut to mongoose.connection objec
const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});