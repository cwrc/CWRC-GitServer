<a name="module_routes/github"></a>

# routes/github

Module providing GitHub related routes.

- [routes/github](#routesgithub)
    - [routes/github~router : `object`](#routesgithubrouter--object)
      - [router.get/authenticate()](#routergetauthenticate)
      - [router.get/callback()](#routergetcallback)
      - [router.get/repos/:owner/:repo/contents(req)](#routergetreposownerrepocontentsreq)
      - [router.post/user/repos(req)](#routerpostuserreposreq)
      - [router.put/repos/:owner/:repo/doc(req)](#routerputreposownerrepodocreq)
      - [router.put/repos/:owner/:repo/pr(req)](#routerputreposownerrepoprreq)
      - [router.put/repos/:owner/:repo/pr(req)](#routerputreposownerrepoprreq-1)
      - [router.get/users/:username(req)](#routergetusersusernamereq)
      - [router.get/users()](#routergetusers)
      - [router.get/user/repos(req)](#routergetuserreposreq)
      - [router.get/users/:username/repos(req)](#routergetusersusernamereposreq)
      - [router.get/repos/:owner/:repo/collaborators/:username/permission(req)](#routergetreposownerrepocollaboratorsusernamepermissionreq)
      - [router.get/repos/:owner/:repo(req)](#routergetreposownerreporeq)
      - [router.get/repos/:owner/:repo/full(req)](#routergetreposownerrepofullreq)
      - [router.get/orgs/:org(req)](#routergetorgsorgreq)
      - [router.get/orgs/:org/memberships/:username(req)](#routergetorgsorgmembershipsusernamereq)
      - [router.post/orgs/:org/repos(req)](#routerpostorgsorgreposreq)
      - [router.get/templates()](#routergettemplates)
      - [router.get/search/code(req)](#routergetsearchcodereq)
      - [router.get/search/repositories(req)](#routergetsearchrepositoriesreq)
    - [routes/github~isGithubClientCORS : `object`](#routesgithubisgithubclientcors--object)
    - [routes/github~handleResponsePromise(req, res, next)](#routesgithubhandleresponsepromisereq-res-next)
    - [routes/github~handleAuthentication(req, res, next)](#routesgithubhandleauthenticationreq-res-next)

<a name="module_routes/github..router"></a>

### routes/github~router : `object`

Express router to mount GitHub related functions on.

**Kind**: inner namespace of [`routes/github`](#module_routes/github)  

* [~router](#module_routes/github..router) : `object`
  * [.get/authenticate()](#module_routes/github..router.get/authenticate)
  * [.get/callback()](#module_routes/github..router.get/callback)
  * [.get/repos/:owner/:repo/contents(req)](#module_routes/github..router.get/repos/_owner/_repo/contents)
  * [.post/user/repos(req)](#module_routes/github..router.post/user/repos)
  * [.put/repos/:owner/:repo/doc(req)](#module_routes/github..router.put/repos/_owner/_repo/doc)
  * [.put/repos/:owner/:repo/pr(req)](#module_routes/github..router.put/repos/_owner/_repo/pr)
  * [.get/users/:username(req)](#module_routes/github..router.get/users/_username)
  * [.get/users()](#module_routes/github..router.get/users)
  * [.get/user/repos(req)](#module_routes/github..router.get/user/repos)
  * [.get/users/:username/repos(req)](#module_routes/github..router.get/users/_username/repos)
  * [.get/repos/:owner/:repo/collaborators/:username/permission(req)](#module_routes/github..router.get/repos/_owner/_repo/collaborators/_username/permission)
  * [.get/repos/:owner/:repo(req)](#module_routes/github..router.get/repos/_owner/_repo)
  * [.get/repos/:owner/:repo/full(req)](#module_routes/github..router.get/repos/_owner/_repo/full)
  * [.get/orgs/:org(req)](#module_routes/github..router.get/orgs/_org)
  * [.get/orgs/:org/memberships/:username(req)](#module_routes/github..router.get/orgs/_org/memberships/_username)
  * [.post/orgs/:org/repos(req)](#module_routes/github..router.post/orgs/_org/repos)
  * [.get/templates()](#module_routes/github..router.get/templates)
  * [.get/search/code(req)](#module_routes/github..router.get/search/code)
  * [.get/search/repositories(req)](#module_routes/github..router.get/search/repositories)

<a name="module_routes/github..router.get/authenticate"></a>

#### router.get/authenticate()

Route that redirects to GitHub in order to use OAuth.

**Kind**: static method of [`router`](#module_routes/github..router)  
<a name="module_routes/github..router.get/callback"></a>

#### router.get/callback()

Route that GitHub redirects back to after the user has authenticated at GitHub.
Sets the cwrc-token cookie, used to make authenticated calls.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate](https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate)

**Kind**: static method of [`router`](#module_routes/github..router)  
<a name="module_routes/github..router.get/repos/_owner/_repo/contents"></a>

#### router.get/repos/:owner/:repo/contents(req)

Get a document from GitHub.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDoc](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDoc)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |
| req.query.branch | `String` | The repo branch |
| req.query.path | `String` | The document path |

<a name="module_routes/github..router.post/user/repos"></a>

#### router.post/user/repos(req)

Create a repo in the authenticated user's account.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#createRepo](https://github.com/cwrc/CWRC-Git/blob/master/API.md#createRepo)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| req.body.repo | `String` |  | The repo name |
| req.body.description | `String` |  | The repo description |
| [req.body.isPrivate] | `Boolean` | `false` | Is the repo private? |

<a name="module_routes/github..router.put/repos/_owner/_repo/doc"></a>

#### router.put/repos/:owner/:repo/doc(req)

Save a document.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveDoc](https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveDoc)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |
| req.body.path | `String` | The document path |
| req.body.content | `String` | The document content |
| req.body.branch | `String` | The repo branch |
| req.body.message | `String` | The commit message |
| [req.body.sha] | `String` | The commit SHA |

<a name="module_routes/github..router.put/repos/_owner/_repo/pr"></a>

#### router.put/repos/:owner/:repo/pr(req)

Save a document as a pull request.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveAsPullRequest](https://github.com/cwrc/CWRC-Git/blob/master/API.md#saveAsPullRequest)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |
| req.body.path | `String` | The document path |
| req.body.content | `String` | The document content |
| req.body.branch | `String` | The repo branch |
| req.body.message | `String` | The commit message |
| req.body.title | `String` | The pull request title |
| [req.body.sha] | `String` | The commit SHA |

<a name="module_routes/github..router.put/repos/_owner/_repo/pr"></a>

#### router.put/repos/:owner/:repo/pr(req)

Create a fork for the authenticated user

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |
| [req.body.organization] | `String` | The organization |

<a name="module_routes/github..router.get/users/_username"></a>

#### router.get/users/:username(req)

Get details for a user.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForUser)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.username | `String` | The username |

<a name="module_routes/github..router.get/users"></a>

#### router.get/users()

Get details for the authenticated user.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForAuthenticatedUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForAuthenticatedUser)

**Kind**: static method of [`router`](#module_routes/github..router)  
<a name="module_routes/github..router.get/user/repos"></a>

#### router.get/user/repos(req)

Get the repos for the authenticated user.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForAuthenticatedUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForAuthenticatedUser)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| [req.query.affiliation] | `String` | `owner` | The user's affiliation to the repo |
| [req.query.page] | `Integer` | `1` | The results page to get |
| [req.query.per_page] | `Integer` | `10` | The number of results per page |

<a name="module_routes/github..router.get/users/_username/repos"></a>

#### router.get/users/:username/repos(req)

Get the repos for a user.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getReposForUser)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| req.params.username | `String` |  | The username |
| [req.query.page] | `Integer` | `1` | The results page to get |
| [req.query.per_page] | `Integer` | `10` | The number of results per page |

<a name="module_routes/github..router.get/repos/_owner/_repo/collaborators/_username/permission"></a>

#### router.get/repos/:owner/:repo/collaborators/:username/permission(req)

Get permissions for a given user and repo.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getPermissionsForUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getPermissionsForUser)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |
| req.params.username | `String` | The username |

<a name="module_routes/github..router.get/repos/_owner/_repo"></a>

#### router.get/repos/:owner/:repo(req)

Get the structure for a repo, using GitHub recursive option.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContents](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContents)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |

<a name="module_routes/github..router.get/repos/_owner/_repo/full"></a>

#### router.get/repos/:owner/:repo/full(req)

Get the structure for a repo, by manually recursing through subdirectories.
Intended to be used if the GitHub recursive option didn't work because the repository is too big.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContentsByDrillDown](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getRepoContentsByDrillDown)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.owner | `String` | The repo owner |
| req.params.repo | `String` | The repo name |

<a name="module_routes/github..router.get/orgs/_org"></a>

#### router.get/orgs/:org(req)

Get the details for an organization.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForOrg](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getDetailsForOrg)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.org | `String` | The organization |

<a name="module_routes/github..router.get/orgs/_org/memberships/_username"></a>

#### router.get/orgs/:org/memberships/:username(req)

Get organization membership for a user
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getMembershipForUser](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getMembershipForUser)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| req.params.org | `String` | The organization |
| req.params.username | `String` | The username |

<a name="module_routes/github..router.post/orgs/_org/repos"></a>

#### router.post/orgs/:org/repos(req)

Create a repo for a given organization.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#createOrgRepo](https://github.com/cwrc/CWRC-Git/blob/master/API.md#createOrgRepo)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| req.params.org | `String` |  | The organization |
| req.body.repo | `String` |  | The repo name |
| req.body.description | `String` |  | The repo description |
| [req.body.isPrivate] | `Boolean` | `false` | Is the repo private? |

<a name="module_routes/github..router.get/templates"></a>

#### router.get/templates()

Get the CWRC-Writer templates.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#getTemplates](https://github.com/cwrc/CWRC-Git/blob/master/API.md#getTemplates)

**Kind**: static method of [`router`](#module_routes/github..router)  
<a name="module_routes/github..router.get/search/code"></a>

#### router.get/search/code(req)

Perform a code search.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchCode](https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchCode)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| req.query.q | `String` |  | The search query |
| [req.query.page] | `Integer` | `1` | The results page to get |
| [req.query.per_page] | `Integer` | `10` | The number of results per page |

<a name="module_routes/github..router.get/search/repositories"></a>

#### router.get/search/repositories(req)

Perform a repos search.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchRepos](https://github.com/cwrc/CWRC-Git/blob/master/API.md#searchRepos)

**Kind**: static method of [`router`](#module_routes/github..router)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| req | `Object` |  | The request |
| req.query.q | `String` |  | The search query |
| [req.query.page] | `Integer` | `1` | The results page to get |
| [req.query.per_page] | `Integer` | `10` | The number of results per page |

<a name="module_routes/github..isGithubClientCORS"></a>

### routes/github~isGithubClientCORS : `object`

The CWRC-GitServer config object, located at [https://github.com/cwrc/CWRC-GitServer/blob/master/config.js](https://github.com/cwrc/CWRC-GitServer/blob/master/config.js).

**Kind**: inner namespace of [`routes/github`](#module_routes/github)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| github_client_cors | `Boolean` | Is the GitHub client located at a different origin than this server? |
| github_client_origin | `String` | The GitHub client origin, if different than this server |
| github_client_id | `String` | The OAuth ID |
| github_client_secret | `String` | The OAuth secret |
| github_oath_callback | `String` | The location of this server's callback route |
| github_oath_callback_redirect | `String` | The location of the CWRC-GitWriter instance |
| templates_owner | `String` | The templates repo owner |
| templates_repo | `String` | The templates repo name |
| templates_ref | `String` | The templates repo ref |
| templates_path | `String` | The templates repo path |
| personal_oath_for_testing | `String` | OAuth ID to use for running tests |
| jwt_secret_for_testing | `String` | JWT secret to use for running tests |

<a name="module_routes/github..handleResponsePromise"></a>

### routes/github~handleResponsePromise(req, res, next)

Custom middleware to add standard error handling, based on promises, to routes
that use promises, i.e. the routes that make calls to the GitHub API.
Also sets Access-Control-Allow headers in the response, if isGithubClientCORS returns true.

**Kind**: inner method of [`routes/github`](#module_routes/github)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| res | `Object` | The response |
| next | `function` | Next middleware function |

<a name="module_routes/github..handleAuthentication"></a>

### routes/github~handleAuthentication(req, res, next)

Custom middleware to authenticate with GitHub if a cwrc-token is in the header.
The cwrc-token contains the GitHub OAuth token.
Calls [https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate](https://github.com/cwrc/CWRC-Git/blob/master/API.md#authenticate)

**Kind**: inner method of [`routes/github`](#module_routes/github)  

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | The request |
| res | `Object` | The response |
| next | `function` | Next middleware function |
