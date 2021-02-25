'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const { db } = require('./model/db');


const onServerStart = () => {
    const message = `Server Listening On Port ${PORT}`;
    console.log(message);
};
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }, { limit: '10200kb' }));
app.use(bodyParser.json());
require('./router')(app);


app.listen(PORT, onServerStart);