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
 * Get the Schema's XML.
 * Calls {@ link @param req.params.url}
 * @name get/xml
 * @function
 * @memberof module:routes/schema
 * @param {Object} req The request
 * @param {Object} req.params.url The xml schema uri
 * @param {Object} res.body The schema XML
 */
router.get('/xml/:url', async (req, res) => {
  const resourceURL = req.params.url;
  if (!resourceURL) res.status(204).send();

  const response = await loadResource(resourceURL);
  if (response.statusCode !== 200) res.status(204).send();

  res.type('xml').status(200).send(response.body);
});

/**
 * Get the Schema's CSS.
 * Calls {@ link @param req.params.url}
 * @name get/css
 * @function
 * @memberof module:routes/schema
 * @param {Object} req The request
 * @param {Object} req.params.url The xml schema uri
 * @param {Object} res.body The schema CSS
 */
router.get('/css/:url', async (req, res) => {
  const resourceURL = req.params.url;
  if (!resourceURL) res.status(204).send();

  const response = await loadResource(resourceURL);
  if (response.statusCode !== 200) res.status(204).send();

  res.type('css').status(200).send(response.body);
});

module.exports = router;
