'use strict';
const authrRouter = require('./authr/login');
const studentRouter = require('./student/studentCreate');


module.exports = app => {
    app.use('/api/auth', authrRouter);
    app.use('/api/student', studentRouter);
}