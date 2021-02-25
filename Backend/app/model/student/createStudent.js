'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    studentName: {
        type: String,
        required: true,
    },
    subjectDetails: {
        type: Array,
        required: true
    },
    percentage: {
        type: String,
        required: true
    }
})


const studentSchema = mongoose.model('student', StudentSchema);

module.exports = studentSchema;