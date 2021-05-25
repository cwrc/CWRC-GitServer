/**
 * Module providing GitHub related routes.
 * @module routes/github
 */
const cwrcGit = require('cwrcgit');
const debug = require('debug')('cwrc-server:server');
const express = require('express');
const got = require('got');

const config = require('../../config/config.json');

/**
 * Express router to mount GitHub related functions on.
 * @namespace router
 */
const router = express.Router();

/**
 * The CWRC-GitServer config object, located at {@link https://github.com/cwrc/CWRC-GitServer/blob/master/config.js}.
 * @namespace
 * @property {Boolean} github_client_cors Is the GitHub client located at a different origin than this server?
 * @property {String} github_client_origin The GitHub client origin, if different than this server
 * @property {String} github_client_id The OAuth ID
 * @property {String} github_client_secret The OAuth secret
 * @property {String} github_oath_callback The location of this server's callback route
 * @property {String} github_oath_callback_redirect The location of the CWRC-GitWriter instance
 * @property {String} templates_owner The templates repo owner
 * @property {String} templates_repo The templates repo name
 * @property {String} templates_ref The templates repo ref
 * @property {String} templates_path The templates repo path
 * @property {String} personal_oath_for_testing OAuth ID to use for running tests
 * @property {String} jwt_secret_for_testing JWT secret to use for running tests
 */
const isGithubClientCORS = () => config.github_client_cors;
const getGithubClientOrigin = () => config.github_client_origin;
const getGithubClientId = () => config.github_client_id;
const getGithubOauthCallback = () => config.github_oath_callback;
const getGithubClientSecret = () => config.github_client_secret;
const getAuthenticationCallbackRedirect = () => config.github_oath_callback_redirect;
const getTemplatesOwner = () => config.templates_owner;
const getTemplatesRepo = () => config.templates_repo;
const getTemplatesRef = () => config.templates_ref;
const getTemplatesPath = () => config.templates_path;

/**
 * Custom middleware to add standard error handling, based on promises, to routes
 * that use promises, i.e. the routes that make calls to the GitHub API.
 * Also sets Access-Control-Allow headers in the response, if isGithubClientCORS returns true.
 * @module handleResponsePromise
 * @function
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Function} next Next middleware function
 */
const handleResponsePromise = (req, res, next) => {
  if (isGithubClientCORS()) {
    res.header('Access-Control-Allow-Origin', getGithubClientOrigin());
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'cwrc-token, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  res.handlePromise = async (promise) => {
    const result = await promise.catch((error) => {
      if (error.status === 404) {
        res.status(404).send('Not Found');
      } else {
        console.log('Server error:', error);
        debug(error);
        res.status(500).send(error);
      }
    });
    res.send(result);
  };

  next();
};
router.use(handleResponsePromise);

/**
 * Custom middleware to authenticate with GitHub if a cwrc-token is in the header.
 * The cwrc-token contains the GitHub OAuth token.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate}
 * @module handleAuthentication
 * @function
 * @param {Object} req The request
 * @param {Object} res The response
 * @param {Function} next Next middleware function
 */
const handleAuthentication = (req, res, next) => {
  const githubToken = req.headers['cwrc-token'];
  if (githubToken) {
    cwrcGit.authenticate(githubToken);
    req.githubAuthenticated = true;
    next();
  } else {
    req.githubAuthenticated = false;
    next();
  }
  /*the above could be used later in certain routes like so:
	if(!req.githubAuthenticated) {
		return res.redirect('/login');
	}
	*/
};
router.use(handleAuthentication);

/**
 * Route that redirects to GitHub in order to use OAuth.
 * @name get/authenticate
 * @function
 * @memberof module:routes/github~router
 */
router.get('/authenticate', (req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${getGithubClientId()}&scope=repo&redirect_uri=${getGithubOauthCallback()}`;
  res.redirect(githubAuthURL);
});

/**
 * Route that GitHub redirects back to after the user has authenticated at GitHub.
 * Sets the cwrc-token cookie, used to make authenticated calls.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate}
 * @name get/callback
 * @function
 * @memberof module:routes/github~router
 */
router.get('/callback', async (req, res) => {
  if (!req.query.code) return; // do something here, although this shouldn't ever be the case.

  const code = req.query.code;
  const params = `?code=${code}&client_id=${getGithubClientId()}&client_secret=${getGithubClientSecret()}`;

  const uri = `https://github.com/login/oauth/access_token${params}`;

  const body = await got(uri)
    .json()
    .catch((error) => {
      res.send(error.message);
    });

  const githubOauthToken = body.access_token;
  cwrcGit.authenticate(githubOauthToken);
  res.cookie('cwrc-token', githubOauthToken);
  res.redirect(getAuthenticationCallbackRedirect());
});

/**
 * Get a document from GitHub.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDoc}
 * @name get/repos/:owner/:repo/contents
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 * @param {String} req.query.branch The repo branch
 * @param {String} req.query.path The document path
 */
router.get('/repos/:owner/:repo/contents', ({ params: { owner, repo }, query: { branch, path } }, res) => {
  res.handlePromise(cwrcGit.getDoc({ owner, repo, path, ref: branch }));
});

/**
 * Create a repo in the authenticated user's account.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#createRepo}
 * @name post/user/repos
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.body.repo The repo name
 * @param {String} req.body.description The repo description
 * @param {Boolean} [req.body.isPrivate=false] Is the repo private?
 */
router.post('/user/repos', ({ body }, res) => {
  const { owner, repo, description, isPrivate = false } = body;
  if (!repo) {
    res.status(422).send('You need at least a name for your document!');
  } else {
    res.handlePromise(cwrcGit.createRepo({ owner, repo, description, isPrivate }));
  }
});

/**
 * Save a document.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveDoc}
 * @name put/repos/:owner/:repo/doc
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 * @param {String} req.body.path The document path
 * @param {String} req.body.content The document content
 * @param {String} req.body.branch The repo branch
 * @param {String} req.body.message The commit message
 * @param {String} [req.body.sha] The commit SHA
 */
router.put('/repos/:owner/:repo/doc', ({ params: { owner, repo }, body }, res) => {
  const { path, content, branch, message, sha } = body;
  res.handlePromise(cwrcGit.saveDoc({ owner, repo, path, content, branch, message, sha }));
});

/**
 * Save a document as a pull request.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveAsPullRequest}
 * @name put/repos/:owner/:repo/pr
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 * @param {String} req.body.path The document path
 * @param {String} req.body.content The document content
 * @param {String} req.body.branch The repo branch
 * @param {String} req.body.message The commit message
 * @param {String} req.body.title The pull request title
 * @param {String} [req.body.sha] The commit SHA
 */
router.post('/repos/:owner/:repo/pr', ({ params: { owner, repo }, body }, res) => {
  res.handlePromise(cwrcGit.saveAsPullRequest({ ...body, owner, repo }));
});

/**
 * Create a fork for the authenticated user
 *
 * @name put/repos/:owner/:repo/pr
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 * @param {String} [req.body.organization] The organization
 */
router.post('/repos/:owner/:repo/forks', ({ params: { owner, repo }, body }, res) => {
  // const fork = { owner, repo, organization: body.organization};
  // if (body.organization) fork.organization = body.organization;
  res.handlePromise(
    cwrcGit.createFork({
      owner,
      repo,
      organization: body.organization,
    })
  );
});

/**
 * Get details for a user.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForUser}
 * @name get/users/:username
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.username The username
 */
router.get('/users/:username', ({ params: { username } }, res) => {
  res.handlePromise(cwrcGit.getDetailsForUser(username));
});

/**
 * Get details for the authenticated user.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForAuthenticatedUser}
 * @name get/users
 * @function
 * @memberof module:routes/github~router
 */
router.get('/users', (req, res) => {
  res.handlePromise(cwrcGit.getDetailsForAuthenticatedUser());
});

/**
 * Get the repos for the authenticated user.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForAuthenticatedUser}
 * @name get/user/repos
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} [req.query.affiliation=owner] The user's affiliation to the repo
 * @param {Integer} [req.query.page=1] The results page to get
 * @param {Integer} [req.query.per_page=10] The number of results per page
 */
router.get('/user/repos', ({ query: { page = 1, per_page = 10, affiliation = 'owner' } }, res) => {
  res.handlePromise(cwrcGit.getReposForAuthenticatedUser(affiliation, page, per_page));
});

/**
 * Get the repos for a user.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForUser}
 * @name get/users/:username/repos
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.username The username
 * @param {Integer} [req.query.page=1] The results page to get
 * @param {Integer} [req.query.per_page=10] The number of results per page
 */
router.get('/users/:username/repos', ({ params: { username }, query: { page = 1, per_page = 10 } }, res) => {
  res.handlePromise(cwrcGit.getReposForUser(username, page, per_page));
});

/**
 * Get permissions for a given user and repo.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getPermissionsForUser}
 * @name get/repos/:owner/:repo/collaborators/:username/permission
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 * @param {String} req.params.username The username
 */
router.get('/repos/:owner/:repo/collaborators/:username/permission', ({ params: { owner, repo, username } }, res) => {
  res.handlePromise(cwrcGit.getPermissionsForUser({ owner, repo, username }));
});

/**
 * Get the structure for a repo, using GitHub recursive option.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContents}
 * @name get/repos/:owner/:repo
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 */
router.get('/repos/:owner/:repo', ({ params: { owner, repo } }, res) => {
  res.handlePromise(cwrcGit.getRepoContents({ owner, repo }));
});

/**
 * Get the structure for a repo, by manually recursing through subdirectories.
 * Intended to be used if the GitHub recursive option didn't work because the repository is too big.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContentsByDrillDown}
 * @name get/repos/:owner/:repo/full
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.owner The repo owner
 * @param {String} req.params.repo The repo name
 */
router.get('/repos/:owner/:repo/full', ({ params: { owner, repo } }, res) => {
  res.handlePromise(cwrcGit.getRepoContentsByDrillDown(owner, repo));
});

/**
 * Get the details for an organization.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForOrg}
 * @name get/orgs/:org
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.org The organization
 */
router.get('/orgs/:org', ({ params: { org } }, res) => {
  res.handlePromise(cwrcGit.getDetailsForOrg(org));
});

/**
 * Get organization membership for a user
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getMembershipForUser}
 * @name get/orgs/:org/memberships/:username
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.org The organization
 * @param {String} req.params.username The username
 */
router.get('/orgs/:org/memberships/:username', ({ params: { org, username } }, res) => {
  res.handlePromise(cwrcGit.getMembershipForUser({ org, username }));
});

/**
 * Create a repo for a given organization.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#createOrgRepo}
 * @name post/orgs/:org/repos
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.params.org The organization
 * @param {String} req.body.repo The repo name
 * @param {String} req.body.description The repo description
 * @param {Boolean} [req.body.isPrivate=false] Is the repo private?
 */
router.post('/orgs/:org/repos', ({ params: { org }, body }, res) => {
  const { repo, description, isPrivate = false } = body;
  if (!repo) {
    res.status(422).send('You need at least a name for your document!');
  } else {
    res.handlePromise(cwrcGit.createOrgRepo({ org, repo, description, isPrivate }));
  }
});

/**
 * Get the CWRC-Writer templates.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#getTemplates}
 * @name get/templates
 * @function
 * @memberof module:routes/github~router
 */
router.get('/templates', (req, res) => {
  const owner = getTemplatesOwner();
  const repo = getTemplatesRepo();
  const ref = getTemplatesRef();
  const path = getTemplatesPath();
  res.handlePromise(cwrcGit.getTemplates(owner, repo, ref, path));
});

/**
 * Perform a code search.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchCode}
 * @name get/search/code
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.query.q The search query
 * @param {Integer} [req.query.page=1] The results page to get
 * @param {Integer} [req.query.per_page=10] The number of results per page
 */
router.get('/search/code', ({ query: { q, page = 1, per_page = 10 } }, res) => {
  res.handlePromise(cwrcGit.searchCode(q, page, per_page));
});

/**
 * Perform a repos search.
 * Calls {@link https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchRepos}
 * @name get/search/repositories
 * @function
 * @memberof module:routes/github~router
 * @param {Object} req The request
 * @param {String} req.query.q The search query
 * @param {Integer} [req.query.page=1] The results page to get
 * @param {Integer} [req.query.per_page=10] The number of results per page
 */
router.get('/search/repositories', ({ query: { q, page = 1, per_page = 10 } }, res) => {
  res.handlePromise(cwrcGit.searchRepos(q, page, per_page));
});

module.exports = router;
