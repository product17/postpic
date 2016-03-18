'use strict';

const express = require('express');
const app = express();

app.use(require('./crud.routes'));

module.exports = app;
