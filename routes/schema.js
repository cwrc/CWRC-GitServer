/**
 * Module providing XML/CSS SCHEMAS related routes.
 * @module routes/schema
 */
const debug = require('debug')('cwrc-server:server');
const express = require('express');
const got = require('got');

/**
 * Express router to mount schema related functions on.
 * @namespace router
 */
const router = new express.Router();
router.use(express.json());

/**
 * Custom middleware sets Access-Control-Allow headers in the response.
 * @function
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Function} next Next middleware function
 */
const httpHeaders = (request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

router.use(httpHeaders);

/**
 * Get request from uri.
 * Calls {@ link @param url}
 * @module loadResource
 * @function
 * @param {String} url The uri to load
 */
const loadResource = async (url) => {
	const res = await got(url).catch((error) => {
		debug(error);
		return { statusCode: 500 };
	});
	return res;
};

/**
 * Get the XML Schema from a repo.
 * Calls {@ link @param req.query.url}
 * @name get/xml
 * @function
 * @memberof module:routes/schema
 * @param {Object} req The request
 * @param {Object} req.query.url The xml schema uri
 */
router.get('/xml', async (req, res) => {
	const resourceURL = req.query.url;

	//if there is no url, send 'no content HTTP Response'
	if (!resourceURL) res.status(204).send();

	const schema = await loadResource(resourceURL);

	//if fetch fails, send 'No Content HTTP Response 204'
	if (schema.statusCode !== 200) res.status(204).send();

	//send xml
	res.type('xml').status(200).send(schema.body);
});

/**
 * Get the CSS Schema from a repo.
 * Calls {@ link @param url and/or @param altUrl}
 * @name post/css
 * @function
 * @memberof module:routes/schema
 * @param {Object} req The request
 * @param {Object} req.body The object containing the schema information
 * @param {String} req.body.cssUrl The primary xml schema uri
 * @param {String} req.query.altCssUrl The secundary xml schema uri
 */
router.get('/css', async (req, res) => {
	const resourceURL = req.query.url;

	//if there is not url, send 'no content HTTP Response'
	if (!resourceURL) res.status(204).send();

	const schema = await loadResource(resourceURL);

	//if fetch fails, send 'No Content HTTP Response 204'
	if (schema.statusCode !== 200) res.status(204).send();

	//send css
	res.type('css').status(200).send(schema.body);
});

module.exports = router;
