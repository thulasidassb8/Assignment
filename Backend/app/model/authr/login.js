const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loginSchema = new Schema({
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const authrSchema = mongoose.model('login', loginSchema);

module.exports = authrSchema;