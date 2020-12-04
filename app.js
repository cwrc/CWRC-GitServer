const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');

const config = require('./config/config.json');
const github = require('./routes/github');
const schemaRouter = require('./routes/schema');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(`${config.gitserver_root_prefix}/github`, github);
app.use(`${config.gitserver_root_prefix}/schema`, schemaRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.end(`<div>Error: ${err.message} and stack trace: ${err}</div>`);
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.end(`<div>Error: ${err.message} and stack trace: ${err}</div>`);
});

module.exports = app;
