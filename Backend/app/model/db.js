'use strict';

const mongoose = require('mongoose');
const config = require('config');
const dbURL = config.get('db.uil');

async function connectToDB() {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
        process.exit(1);
    }
}


connectToDB();

const db = mongoose.connection;

module.exports = db;