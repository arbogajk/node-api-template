const express = require('express');
const app = express();
const api = require('./api/v1/api');
const err = require('./middleware/errorHandlingMiddleware');

require('./middleware/appMiddleware')(app);

app.use('/api/v1/', api);

app.use(err());

module.exports = app;