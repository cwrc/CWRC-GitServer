/* eslint-disable quotes */
const nock = require('nock');
const config = require('../config/config.json');
const fixtures = require('./fixtures.js');

// we use the cwrcAppName to match CWRC GitHub repositories that are themselves documemnts,
// but we don't match to match repositories that are code repositories,
// so here we sneakily concatenate the full string to avoid matches on this code repo.
const cwrcAppName = 'CWRC-GitWriter' + '-web-app';

const getDetailsForAuthenticatedUserNock = () => {
	nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/user')
		.reply(
			200,
			[
				'1f8b08000000000000039554cb6edb3010fc954067db7af82d206881b43d35010ca445d08bb0a2689b094d0a1469d736fcef1deae1a66e7b902f961633b3a35d0ecf81d41ba18234908ed1ab0b06812882344ea693f9783908942e78e62bc1e3a7d5ecfbcb9364af9f8f4fcfabf1e3e9ed1e68da932593392381d95a5b56691836c52a',
				'196d84ddbadc55dc30ad2c5776c4f42e7461abff617f3f81c6c6b42a7523146ed44ad10a356ca855e1d5eed6eee44dfba66b0dbec2d65a4a7d00f3d6eaffc5c32b07969a67a136bdf9e09c436db71c5382f58bff6051d93e466afc39f47f588657a83074c38b1e665a06ac1c145c9c43c34b5d4bb9bc6246945668d5c7d41f3ce868b321254ed45707bc0a746fa74ffb1a0f1edfe358f521368473581ab12776f423309c71b1c7387b8bdd30a1658f25c729fe8655fbe10acb332a763e626b921547a468e7015f1d13a4f4dd17234e276e08601cd892d4314895937210e48866134c0f1cada5fba94764ec28f7ca52b37ad43e9ac896e1240777ab87c1dd03292abc1cdf91f0a96c32f071c77d2250df0a807309136d1fa1bbc7d2e552b0ac996d1a2f06415ba94f20ee852e080812dec6ef7211a4c9049f00698b419245e3248ae3619c0ce3e83919a7d1229d463fd0df95c57b4c120da31a132fd364914e261e532f07a3fbddd76a4b32ebea9d431c3b1ce7e21ff542546f081c6df09de3d97c3c8377864b80726dc86aef3fc2b60e3a5b13c37b460e19555674636dd7554ac28ccfddda4aa3fd5a4b62d05dce67d3593259e2a2fc5bfac6ea12bfcbe517edebab4c70050000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 04:08:40 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4998',
				'X-RateLimit-Reset',
				'1581397691',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'W/"93b1e34daf1f1f5825de1b3a9693095a"',
				'Last-Modified',
				'Mon, 10 Feb 2020 19:28:44 GMT',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'B15C:443F:156492:335C9E:5E4228C8',
			]
		);
};

const getReposForAuthenticatedUserNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/user/repos')
		.query(true)
		.reply(200, [
			{
				id: 19289649,
				name: fixtures.testRepo,
			},
		]);
};

const getGithubCommitNock = () => {
	// NOTE:  I put in more in the reply than necessary. I  put it in
	// to help explain what's going on.
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.post(`/repos/${fixtures.owner}/${fixtures.testRepo}/git/commits`, (body) => {
			return (
				body.message === 'saving cwrc version' &&
				body.tree === 'newTreeSHAForTesting' &&
				body.parents[0] === 'parentCommitSHAForTesting'
			);
		})
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(201, {
			sha: fixtures.newCommitSHA,
			tree: {
				sha: fixtures.newTreeSHA,
			},
			message: fixtures.commitMessage,
			parents: [
				{
					sha: fixtures.parentCommitSHA,
				},
			],
		});
};

const getUpdateGithubCWRCBranchNock = () => {
	// this is exactly the same as the create one above, but uses patch instead of post.
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.patch(`/repos/${fixtures.owner}/${fixtures.testRepo}/git/refs/heads/master`, {
			sha: fixtures.newCommitSHA,
		})
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(201, {
			ref: 'refs/heads/master',
			object: {
				sha: fixtures.newCommitSHA,
			},
		});
};

const getCreateGithubTagNock = () => {
	// NOTE:  I didn't really need to return anything in the reply.  It isn't used.  I just put it in
	// to help explain what's going on.
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.post(`/repos/${fixtures.owner}/${fixtures.testRepo}/git/refs`, {
			ref: `refs/tags/cwrc/${fixtures.versionTimestamp}`,
			sha: fixtures.newCommitSHA,
		})
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(201, {
			ref: `refs/tags/cwrc/${fixtures.versionTimestamp}`,
			object: {
				sha: fixtures.newCommitSHA,
			},
		});
};

const getGithubTreeNock = () => {
	// In this one, I only return what's needed for the test to continue, i.e., the newSHA
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.post(`/repos/${fixtures.owner}/${fixtures.testRepo}/git/trees`, (body) => {
			return (
				body.tree[0].path === 'document.xml' &&
				body.tree[0].content.includes(
					`<encodingDesc><appInfo><application version="1.0" ident="${cwrcAppName}" notAfter="`
				) &&
				body.tree[1].path === 'annotations.json'
			);
		})
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(201, {
			sha: fixtures.newTreeSHA,
		});
};

const getCreateGithubRepoNock = () => {
	// NOTE:  I put in more in the reply than necessary. I  put it in
	// to help explain what's going on.
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.post('/user/repos', {
			name: 'misc',
			auto_init: true,
			private: false,
			description: 'a description of the repo',
		})
		.reply(
			201,
			{
				id: 239676578,
				node_id: 'MDEwOlJlcG9zaXRvcnkyMzk2NzY1Nzg=',
				name: 'misc',
				full_name: 'lucaju/misc',
				private: false,
				owner: {
					login: 'lucaju',
					id: 1254739,
					node_id: 'MDQ6VXNlcjEyNTQ3Mzk=',
					avatar_url: 'https://avatars2.githubusercontent.com/u/1254739?v=4',
					gravatar_id: '',
					url: 'https://api.github.com/users/lucaju',
					html_url: 'https://github.com/lucaju',
					followers_url: 'https://api.github.com/users/lucaju/followers',
					following_url: 'https://api.github.com/users/lucaju/following{/other_user}',
					gists_url: 'https://api.github.com/users/lucaju/gists{/gist_id}',
					starred_url: 'https://api.github.com/users/lucaju/starred{/owner}{/repo}',
					subscriptions_url: 'https://api.github.com/users/lucaju/subscriptions',
					organizations_url: 'https://api.github.com/users/lucaju/orgs',
					repos_url: 'https://api.github.com/users/lucaju/repos',
					events_url: 'https://api.github.com/users/lucaju/events{/privacy}',
					received_events_url: 'https://api.github.com/users/lucaju/received_events',
					type: 'User',
					site_admin: false,
				},
				html_url: 'https://github.com/lucaju/misc',
				description: 'a description of the repo',
				fork: false,
				url: 'https://api.github.com/repos/lucaju/misc',
				forks_url: 'https://api.github.com/repos/lucaju/misc/forks',
				keys_url: 'https://api.github.com/repos/lucaju/misc/keys{/key_id}',
				collaborators_url:
					'https://api.github.com/repos/lucaju/misc/collaborators{/collaborator}',
				teams_url: 'https://api.github.com/repos/lucaju/misc/teams',
				hooks_url: 'https://api.github.com/repos/lucaju/misc/hooks',
				issue_events_url: 'https://api.github.com/repos/lucaju/misc/issues/events{/number}',
				events_url: 'https://api.github.com/repos/lucaju/misc/events',
				assignees_url: 'https://api.github.com/repos/lucaju/misc/assignees{/user}',
				branches_url: 'https://api.github.com/repos/lucaju/misc/branches{/branch}',
				tags_url: 'https://api.github.com/repos/lucaju/misc/tags',
				blobs_url: 'https://api.github.com/repos/lucaju/misc/git/blobs{/sha}',
				git_tags_url: 'https://api.github.com/repos/lucaju/misc/git/tags{/sha}',
				git_refs_url: 'https://api.github.com/repos/lucaju/misc/git/refs{/sha}',
				trees_url: 'https://api.github.com/repos/lucaju/misc/git/trees{/sha}',
				statuses_url: 'https://api.github.com/repos/lucaju/misc/statuses/{sha}',
				languages_url: 'https://api.github.com/repos/lucaju/misc/languages',
				stargazers_url: 'https://api.github.com/repos/lucaju/misc/stargazers',
				contributors_url: 'https://api.github.com/repos/lucaju/misc/contributors',
				subscribers_url: 'https://api.github.com/repos/lucaju/misc/subscribers',
				subscription_url: 'https://api.github.com/repos/lucaju/misc/subscription',
				commits_url: 'https://api.github.com/repos/lucaju/misc/commits{/sha}',
				git_commits_url: 'https://api.github.com/repos/lucaju/misc/git/commits{/sha}',
				comments_url: 'https://api.github.com/repos/lucaju/misc/comments{/number}',
				issue_comment_url:
					'https://api.github.com/repos/lucaju/misc/issues/comments{/number}',
				contents_url: 'https://api.github.com/repos/lucaju/misc/contents/{+path}',
				compare_url: 'https://api.github.com/repos/lucaju/misc/compare/{base}...{head}',
				merges_url: 'https://api.github.com/repos/lucaju/misc/merges',
				archive_url: 'https://api.github.com/repos/lucaju/misc/{archive_format}{/ref}',
				downloads_url: 'https://api.github.com/repos/lucaju/misc/downloads',
				issues_url: 'https://api.github.com/repos/lucaju/misc/issues{/number}',
				pulls_url: 'https://api.github.com/repos/lucaju/misc/pulls{/number}',
				milestones_url: 'https://api.github.com/repos/lucaju/misc/milestones{/number}',
				notifications_url:
					'https://api.github.com/repos/lucaju/misc/notifications{?since,all,participating}',
				labels_url: 'https://api.github.com/repos/lucaju/misc/labels{/name}',
				releases_url: 'https://api.github.com/repos/lucaju/misc/releases{/id}',
				deployments_url: 'https://api.github.com/repos/lucaju/misc/deployments',
				created_at: '2020-02-11T04:33:51Z',
				updated_at: '2020-02-11T04:33:51Z',
				pushed_at: '2020-02-11T04:33:53Z',
				git_url: 'git://github.com/lucaju/misc.git',
				ssh_url: 'git@github.com:lucaju/misc.git',
				clone_url: 'https://github.com/lucaju/misc.git',
				svn_url: 'https://github.com/lucaju/misc',
				homepage: null,
				size: 0,
				stargazers_count: 0,
				watchers_count: 0,
				language: null,
				has_issues: true,
				has_projects: true,
				has_downloads: true,
				has_wiki: true,
				has_pages: false,
				forks_count: 0,
				mirror_url: null,
				archived: false,
				disabled: false,
				open_issues_count: 0,
				license: null,
				forks: 0,
				open_issues: 0,
				watchers: 0,
				default_branch: 'master',
				permissions: {
					admin: true,
					push: true,
					pull: true,
				},
				allow_squash_merge: true,
				allow_merge_commit: true,
				allow_rebase_merge: true,
				delete_branch_on_merge: false,
				network_count: 0,
				subscribers_count: 1,
			},
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 04:33:53 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Content-Length',
				'4725',
				'Connection',
				'close',
				'Status',
				'201 Created',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4992',
				'X-RateLimit-Reset',
				'1581397692',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'"a7a8b581bbea90ad113f26fad6488e6c"',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'public_repo, repo',
				'Location',
				'https://api.github.com/repos/lucaju/misc',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'X-GitHub-Request-Id',
				'AFC5:4E6D:D70F4:1FA14E:5E422EAF',
			]
		);
};

const getMasterBranchFromGithubNock = () => {
	// NOTE:  I put in more in the reply than necessary. I  put it in
	// to help explain what's going on.
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get(`/repos/${fixtures.owner}/${fixtures.testRepo}/branches/master`)
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(200, {
			commit: {
				sha: fixtures.parentCommitSHA,
				commit: {
					message: 'test commit',
					tree: {
						sha: fixtures.baseTreeSHA,
					},
				},
			},
		});
};

const getDocumentFromGithubNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get(`/repos/${fixtures.owner}/${fixtures.testRepo}/contents/document.xml`)
		.query({
			ref: 'master',
			access_token: config.personal_oath_for_testing,
		})
		.reply(200, {
			content: fixtures.base64TestDoc,
		});
};

const getAnnotationsFromGithubNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get(`/repos/${fixtures.owner}/${fixtures.testRepo}/contents/annotations.json`)
		.query({
			ref: 'master',
			access_token: config.personal_oath_for_testing,
		})
		.reply(200, {
			content: fixtures.base64AnnotationBundle,
		});
};

const getBranchInfoFromGithubNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get(`/repos/${fixtures.owner}/${fixtures.testRepo}/branches/master`)
		.query({
			access_token: config.personal_oath_for_testing,
		})
		.reply(200, {
			commit: {
				sha: "thid doesn't matter",
				commit: {
					message: 'a fake commit message',
					tree: {
						sha: 'someSHAorAnother',
					},
				},
			},
		});
};

const getReposForGithubUserNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get(`/users/${fixtures.owner}/repos`)
		.query(true)
		.reply(200, [
			{
				id: 76067525,
				name: 'misc',
				full_name: fixtures.ownerAndRepo,
				owner: {
					login: fixtures.owner,
				},
				private: false,
				description: 'a description of the repo',
			},
			{
				id: 75946742,
				name: 'misc',
				full_name: fixtures.owner + '/someOtherRepo',
				owner: {
					login: fixtures.owner,
				},
				private: true,
				default_branch: 'master',
			},
		]);
};

const getTemplateNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/repos/cwrc/CWRC-Writer-Templates/contents/templates%2Fletter.xml')
		.query({
			ref: 'master',
			access_token: config.personal_oath_for_testing,
		})
		.reply(
			200,
			{
				name: 'letter.xml',
				path: 'templates/letter.xml',
				sha: '1525a783ddcd2844d75677d3748673d749c99963',
				size: 4470,
				url:
					'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/letter.xml?ref=master',
				html_url:
					'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/letter.xml',
				git_url:
					'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/1525a783ddcd2844d75677d3748673d749c99963',
				download_url:
					'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/letter.xml',
				type: 'file',
				content:
					'77u/PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPD94\nbWwtbW9kZWwgaHJlZj0iaHR0cDovL2N3cmMuY2Evc2NoZW1hcy9jd3JjX3Rl\naV9saXRlLnJuZyIgdHlwZT0iYXBwbGljYXRpb24veG1sIiBzY2hlbWF0eXBl\nbnM9Imh0dHA6Ly9yZWxheG5nLm9yZy9ucy9zdHJ1Y3R1cmUvMS4wIj8+Cjw/\neG1sLXN0eWxlc2hlZXQgdHlwZT0idGV4dC9jc3MiIGhyZWY9Imh0dHA6Ly9j\nd3JjLmNhL3RlbXBsYXRlcy9jc3MvdGVpLmNzcyI/Pgo8VEVJIHhtbG5zPSJo\ndHRwOi8vd3d3LnRlaS1jLm9yZy9ucy8xLjAiIHhtbG5zOnJkZj0iaHR0cDov\nL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6\nY3c9Imh0dHA6Ly9jd3JjLmNhL25zL2N3IyIgeG1sbnM6dz0iaHR0cDovL2N3\ncmN0Yy5hcnRzcm4udWFsYmVydGEuY2EvIyI+Cgk8cmRmOlJERiB4bWxuczpy\nZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1u\ncyMiIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiIHhtbG5zOm9h\nPSJodHRwOi8vd3d3LnczLm9yZy9ucy9vYSMiIHhtbG5zOmZvYWY9Imh0dHA6\nLy94bWxucy5jb20vZm9hZi8wLjEvIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJk\nZjphYm91dD0iaHR0cDovL2FwcHMudGVzdGluZy5jd3JjLmNhL2VkaXRvci9k\nb2N1bWVudHMvbnVsbCI+CgkJCTxjdzptb2RlPjA8L2N3Om1vZGU+CgkJPC9y\nZGY6RGVzY3JpcHRpb24+CgkJPHJkZjpEZXNjcmlwdGlvbiB4bWxuczpyZGY9\nImh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMi\nIHJkZjphYm91dD0iaHR0cDovL2lkLmN3cmMuY2EvYW5ub3RhdGlvbi8zM2Mz\nNzdmMS0yMWZhLTQ1OTQtOWIxZi05M2Q3ZTM4N2ZjOGEiPgoJCQk8b2E6aGFz\nVGFyZ2V0IHhtbG5zOm9hPSJodHRwOi8vd3d3LnczLm9yZy9ucy9vYSMiIHJk\nZjpyZXNvdXJjZT0iaHR0cDovL2lkLmN3cmMuY2EvdGFyZ2V0LzE2OGJhMzlk\nLTJiYjktNDY0ZC1iMzNhLTAxM2ZhNjMwZDJjMSIvPgoJCQk8b2E6aGFzQm9k\neSB4bWxuczpvYT0iaHR0cDovL3d3dy53My5vcmcvbnMvb2EjIiByZGY6cmVz\nb3VyY2U9Imh0dHA6Ly9jd3JjLWRldi0wMS5zcnYudWFsYmVydGEuY2EvaXNs\nYW5kb3JhL29iamVjdC83M2MzMzRkMy0yNjI5LTRmNjMtODM1Yi0yM2ZjMGE3\nMDZkN2MiLz4KCQkJPG9hOmFubm90YXRlZEJ5IHhtbG5zOm9hPSJodHRwOi8v\nd3d3LnczLm9yZy9ucy9vYSMiIHJkZjpyZXNvdXJjZT0iaHR0cDovL2lkLmN3\ncmMuY2EvdXNlci8wNmY5M2JjMy1kODNhLTQzMDAtYTIwOS0zY2YxMmNjNmE5\nZTkiLz4KCQkJPG9hOmFubm90YXRlZEF0IHhtbG5zOm9hPSJodHRwOi8vd3d3\nLnczLm9yZy9ucy9vYSMiPjIwMTQtMTAtMDFUMTY6MTI6MTMuNDY0Wjwvb2E6\nYW5ub3RhdGVkQXQ+CgkJCTxvYTpzZXJpYWxpemVkQnkgeG1sbnM6b2E9Imh0\ndHA6Ly93d3cudzMub3JnL25zL29hIyIgcmRmOnJlc291cmNlPSIiLz4KCQkJ\nPG9hOnNlcmlhbGl6ZWRBdCB4bWxuczpvYT0iaHR0cDovL3d3dy53My5vcmcv\nbnMvb2EjIj4yMDE0LTEwLTAxVDE2OjEyOjEzLjQ2NFo8L29hOnNlcmlhbGl6\nZWRBdD4KCQkJPHJkZjp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3d3dy53\nMy5vcmcvbnMvb2EjQW5ub3RhdGlvbiIvPgoJCQk8b2E6bW90aXZhdGVkQnkg\neG1sbnM6b2E9Imh0dHA6Ly93d3cudzMub3JnL25zL29hIyIgcmRmOnJlc291\ncmNlPSJodHRwOi8vd3d3LnczLm9yZy9ucy9vYSN0YWdnaW5nIi8+CgkJCTxv\nYTptb3RpdmF0ZWRCeSB4bWxuczpvYT0iaHR0cDovL3d3dy53My5vcmcvbnMv\nb2EjIiByZGY6cmVzb3VyY2U9Imh0dHA6Ly93d3cudzMub3JnL25zL29hI2lk\nZW50aWZ5aW5nIi8+CgkJCTxjdzpoYXNDZXJ0YWludHkgeG1sbnM6Y3c9Imh0\ndHA6Ly9jd3JjLmNhL25zL2N3IyIgcmRmOnJlc291cmNlPSJodHRwOi8vY3dy\nYy5jYS9ucy9jdyNkZWZpbml0ZSIvPgoJCQk8Y3c6Y3dyY0luZm8geG1sbnM6\nY3c9Imh0dHA6Ly9jd3JjLmNhL25zL2N3IyI+eyJpZCI6Imh0dHA6Ly92aWFm\nLm9yZy92aWFmLzM5NTY5NzUyIiwibmFtZSI6IkJyb3duLCBNaXF1ZWwiLCJy\nZXBvc2l0b3J5IjoidmlhZiJ9PC9jdzpjd3JjSW5mbz4KCQkJPGN3OmN3cmNB\ndHRyaWJ1dGVzIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiPnsi\nY2VydCI6ImRlZmluaXRlIiwidHlwZSI6InJlYWwiLCJyZWYiOiJodHRwOi8v\ndmlhZi5vcmcvdmlhZi8zOTU2OTc1MiJ9PC9jdzpjd3JjQXR0cmlidXRlcz4K\nCQk8L3JkZjpEZXNjcmlwdGlvbj4KCQk8cmRmOkRlc2NyaXB0aW9uIHhtbG5z\nOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4\nLW5zIyIgcmRmOmFib3V0PSJodHRwOi8vY3dyYy1kZXYtMDEuc3J2LnVhbGJl\ncnRhLmNhL2lzbGFuZG9yYS9vYmplY3QvNzNjMzM0ZDMtMjYyOS00ZjYzLTgz\nNWItMjNmYzBhNzA2ZDdjIj4KCQkJPHJkZjp0eXBlIHJkZjpyZXNvdXJjZT0i\naHR0cDovL3d3dy53My5vcmcvbnMvb2EjU2VtYW50aWNUYWciLz4KCQkJPHJk\nZjp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3htbG5zLmNvbS9mb2FmLzAu\nMS9QZXJzb24iLz4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCQk8cmRmOkRlc2Ny\naXB0aW9uIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8y\nMi1yZGYtc3ludGF4LW5zIyIgcmRmOmFib3V0PSJodHRwOi8vaWQuY3dyYy5j\nYS90YXJnZXQvMTY4YmEzOWQtMmJiOS00NjRkLWIzM2EtMDEzZmE2MzBkMmMx\nIj4KCQkJPG9hOmhhc1NvdXJjZSB4bWxuczpvYT0iaHR0cDovL3d3dy53My5v\ncmcvbnMvb2EjIiByZGY6cmVzb3VyY2U9Imh0dHA6Ly9pZC5jd3JjLmNhL2Rv\nYy85YTgxMzIzNi00YjRlLTRmMzEtYjQxOC03YTE4M2EyODViNWUiLz4KCQkJ\nPHJkZjp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3d3dy53My5vcmcvbnMv\nb2EjU3BlY2lmaWNSZXNvdXJjZSIvPgoJCQk8b2E6aGFzU2VsZWN0b3IgeG1s\nbnM6b2E9Imh0dHA6Ly93d3cudzMub3JnL25zL29hIyIgcmRmOnJlc291cmNl\nPSJodHRwOi8vaWQuY3dyYy5jYS9zZWxlY3Rvci82YjRiYmQxYS1iODg3LTQ5\nOGItYjVmNy1iZTQwMWJmY2Q2ZDkiLz4KCQk8L3JkZjpEZXNjcmlwdGlvbj4K\nCQk8cmRmOkRlc2NyaXB0aW9uIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5v\ncmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgcmRmOmFib3V0PSJodHRw\nOi8vaWQuY3dyYy5jYS9zZWxlY3Rvci82YjRiYmQxYS1iODg3LTQ5OGItYjVm\nNy1iZTQwMWJmY2Q2ZDkiPgoJCQk8cmRmOnZhbHVlPnhwb2ludGVyKC8vcGVy\nc05hbWVbQGFubm90YXRpb25JZD0iZW50XzYyIl0pPC9yZGY6dmFsdWU+CgkJ\nCTxyZGY6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly93d3cudzMub3JnL25z\nL29hI0ZyYWdtZW50U2VsZWN0b3IiLz4KCQk8L3JkZjpEZXNjcmlwdGlvbj4K\nCTwvcmRmOlJERj4KCTx0ZWlIZWFkZXI+CgkJPGZpbGVEZXNjPgoJCQk8dGl0\nbGVTdG10PgoJCQkJPHRpdGxlPlNhbXBsZSBEb2N1bWVudCBUaXRsZTwvdGl0\nbGU+CgkJCTwvdGl0bGVTdG10PgoJCQk8cHVibGljYXRpb25TdG10PgoJCQkJ\nPHAvPgoJCQk8L3B1YmxpY2F0aW9uU3RtdD4KCQkJPHNvdXJjZURlc2Mgc2Ft\nZUFzPSJodHRwOi8vd3d3LmN3cmMuY2EiPgoJCQkJPHA+Q3JlYXRlZCBmcm9t\nIG9yaWdpbmFsIHJlc2VhcmNoIGJ5IG1lbWJlcnMgb2YgQ1dSQy9DU++/vUMg\ndW5sZXNzIG90aGVyd2lzZSBub3RlZC48L3A+CgkJCTwvc291cmNlRGVzYz4K\nCQk8L2ZpbGVEZXNjPgoJPC90ZWlIZWFkZXI+Cgk8dGV4dD4KCQk8Ym9keT4K\nCQkJPGRpdiB0eXBlPSJsZXR0ZXIiPgoJCQkJPGhlYWQ+CgkJCQkJPHRpdGxl\nPlNhbXBsZSBMZXR0ZXIgVGl0bGU8L3RpdGxlPgoJCQkJPC9oZWFkPgoJCQkJ\nPG9wZW5lcj4KCQkJCQk8bm90ZSB0eXBlPSJzZXR0aW5nIj4KCQkJCQkJPHA+\nU29tZSBvcGVuaW5nIG5vdGUgZGVzY3JpYmluZyB0aGUgd3JpdGluZyBzZXR0\naW5nPC9wPgoJCQkJCTwvbm90ZT4KCQkJCQk8ZGF0ZWxpbmU+CgkJCQkJCTxk\nYXRlPlNvbWUgZGF0ZSAoc2V0IGRhdGUgdmFsdWUgaW4gYXR0cmlidXRlKS48\nL2RhdGU+CgkJCQkJPC9kYXRlbGluZT4KCQkJCQk8c2FsdXRlPlNvbWUgc2Fs\ndXRhdGlvbiwgZS5nLiAiRGVhcmVzdCA8cGVyc05hbWUgYW5ub3RhdGlvbklk\nPSJlbnRfNjIiIGNlcnQ9ImRlZmluaXRlIiB0eXBlPSJyZWFsIiByZWY9Imh0\ndHA6Ly92aWFmLm9yZy92aWFmLzM5NTY5NzUyIj5NaXF1ZWw8L3BlcnNOYW1l\nPiI8L3NhbHV0ZT4KCQkJCTwvb3BlbmVyPgoJCQkJPHA+U2FtcGxlIGxldHRl\nciBjb250ZW50PC9wPgoJCQkJPGNsb3Nlcj4KCQkJCQk8c2FsdXRlPlNvbWUg\nY2xvc2luZyBzYWx1dGF0aW9uLCBlLmcuICJXaXRoIGxvdmUuLi4iPC9zYWx1\ndGU+CgkJCQkJPHNpZ25lZD5TZW5kZXIgbmFtZSBhbmQvb3Igc2lnbmF0dXJl\nLjwvc2lnbmVkPgoJCQkJPC9jbG9zZXI+CgkJCTwvZGl2PgoJCTwvYm9keT4K\nCTwvdGV4dD4KPC9URUk+\n',
				encoding: 'base64',
				_links: {
					self:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/letter.xml?ref=master',
					git:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/1525a783ddcd2844d75677d3748673d749c99963',
					html:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/letter.xml',
				},
			},
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 14 Mar 2017 03:29:10 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Content-Length',
				'7061',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4999',
				'X-RateLimit-Reset',
				'1489465750',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'"3a70a0eac710a2f0a7e1ff7d4d5a8806"',
				'Last-Modified',
				'Wed, 07 Dec 2016 19:45:12 GMT',
				'X-OAuth-Scopes',
				'',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
				'Access-Control-Allow-Origin',
				'*',
				'Content-Security-Policy',
				"default-src 'none'",
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Content-Type-Options',
				'nosniff',
				'X-Frame-Options',
				'deny',
				'X-XSS-Protection',
				'1; mode=block',
				'Vary',
				'Accept-Encoding',
				'X-Served-By',
				'173530fed4bbeb1e264b2ed22e8b5c20',
				'X-GitHub-Request-Id',
				'C6FB:DCFF:81252EB:A51FB15:58C76386',
			]
		);
};

const getSearchNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/search/code')
		.query({
			q: 'test%20repo%3Alucaju%2Fmisc',
			page: '1',
			per_page: '10',
		})
		.reply(
			200,
			[
				'1f8b0800000000000003ed5adb6ee33610fd9540af354ccb966f41b28ba29b162dba29b6e8160b340b83a24636135d0c928ae308f9f7ce50b26cd9dbc4f4a26f46822492750e8773218747293d931b9ecc445e64c6bbec773c99893c5d266060a6401789d1de65cc130df8918114affe29bd8ca7e05d7a069e4cd73c19afe32db959b4efe805c71bd35e188b70e8f746bd3ee7becf6138e0413f1220fc09f0c1340ea3095e2045a112042c8c59ea4bc6f85276e7d22c8ab08b063105cb5c4b932b099af5fbc369d09f8c7d26f2cc406634db98f25e417c1d864301a3be2f82380887a3717f1a88309a8ec3a0379c867128603a11230138280e313b6560c4b130c943cd1c66b83069b237dace149342f0fb82a5520b4bcd8e9d4633799c4fe3a7b577597a32c298',
				'6e9cd5f1b23c8219ddf33e7eb859fd91fc96885fa6cffccb9f8f227b587fbcff3cbcfdf06b70fb7c738d4c758cc91cbc8a8b2499d5b7760ca5c82bf9c80da6439d25f92a03458327f95c663856f5383e4923fbfd61301e4cdbb67c1afdfde53611f737ebdbbf3e0d3e3e3fd0f81c59b9da0f8ebda9fb756a141a549d02364b0a56f3bf7fbc0e28baaa66b193c61baf869ad8346bcc3d265ae4993c49f21522f74d6d27f02e396b300d5e6673673c624a969b05a097d0f4179ab0d4c6c510fb7cc9e81726063168f4af82c8c1981a81a650e45f4a5bab96aa08b5507269649eb918d5c2214faee63c93cfdc9507711ae1b6241ce6639f471c3cd2cae200ac0025b31521d6e4020502e423bad3996c0f895c66bda445f733869a9c8babf18c47299598adbc970eae9d47ae2f888fa0898d779961755326ab87a68c5fad14eba2ba52ec828584847ec35b07302c040421f801d6ce58c2940c7fd6992bb01079982b8ebb8433590b5ce2beb2e5a2381ae0a933a705217891e7ee9eb120044bad0b382a7d0ebd6bb19a6df2322bd2b05a268ec9c643ba0a853671ade53c0370f648032cd966c50a15cfc4c29d6a832b59f5978d129f3b9b441884dabdfcf55a3f7448d304940cbb9d6afd35b353ac2026c2b588b09539c924c23544469d10276b0e011b1a5ce40d86ccd99e0d8e95b587129ecd0b3e77676a80182dda72e6fcf9cd4df730645b24d250eba064589cb6606cb16451b5d7617db9bb680bdd12d94dd3351f77374e3bbd34956fed60872eaa61ad543c918af2689f8eaedfde58bf6d16e14ab65dc7aac5b16674f556bd3a6eecd9e5dd1c2b5c299be348f9031d88684540fa2557e0ce6461ac0c396eeddd6eb75c00b70d5a0aea84eaa95008e74a2cb02371b5a7dce070c74eb9b15d5e4ce644d8f525398f9cd3be012249150a579b2ad46edc96d8c7381b6241bb2ca94c409b3c735fa3b6c85dbe2c373296e298fef530ed5be0f2bdc6f3397438b66b981e460a897986e7008a04363fe03efb0a85e6e291beea5813c09473f6a2820a57b2ea1c11c132c9d72755fa0ed4c3ae568b5c61e3eb777bd4873d9919e61f750c5689c8c37b10a71de19b623d593ca807af1bf39f316d7eaaf4088cc652e54b50068fe1769bc1950b6fc68acfc925a4942ca4bec06f7e6130d9ee32aaec9d79d144e929fc8cea238ba4b033f67b1d3ff8fa425f9d4687d19c149bdfc11850dda734a1e12b3de61b9f54ba0c47fda317f9932016433ef02711e741144fc70061301683300afa413c9c70a47afb24f08a2eb36f80d5670484301a84e16814a31523d11f0d8771e4c370d20fa2b1f07d7f0ce37140837fbf3ee330d3a3cf4f953e73ec34d8be13705eb6d0c96f679d86a27cd6690e14cf966074d6692a7d6f47a1ab24614c9e630eb32d679e751ae7ddfdacd3ecbc86d815bed859a739784dd3f2cf59a7d9bcbd6ab9854ec6679da6f576afe59fb34ef3ad17a02d17ed0b2bd42a9f759aff7a77bce7bafab5f159a77933cdce3acd512975d669fe7f9d66ff1ced2a267c8f5ef3ee4af3a430f08e24992b3cd2db8bbbecce6cbeaeec4bb1a875efce5ca10aa46f515cbb40ebe1477d7d67ffc505ffc365b55a75637cc9420aaf3ddd3c4a58313856099a76fc4125047d7df917cb8e3738c7230000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 04:52:45 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'30',
				'X-RateLimit-Remaining',
				'28',
				'X-RateLimit-Reset',
				'1581396780',
				'Cache-Control',
				'no-cache',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; param=text-match',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'88BF:2EEE:28476A:4E40BE:5E42331D',
			]
		);
};

const getTemplatesNock = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/repos/cwrc/CWRC-Writer-Templates/contents/templates')
		.query({
			ref: 'master',
			access_token: config.personal_oath_for_testing,
		})
		.reply(
			200,
			[
				{
					name: 'Sample_Canadian_Women_Playwrights_entry.xml',
					path: 'templates/Sample_Canadian_Women_Playwrights_entry.xml',
					sha: 'c03aab155adf94869e64867204b57f5418521379',
					size: 93879,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/Sample_Canadian_Women_Playwrights_entry.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/Sample_Canadian_Women_Playwrights_entry.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/c03aab155adf94869e64867204b57f5418521379',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/Sample_Canadian_Women_Playwrights_entry.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/Sample_Canadian_Women_Playwrights_entry.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/c03aab155adf94869e64867204b57f5418521379',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/Sample_Canadian_Women_Playwrights_entry.xml',
					},
				},
				{
					name: 'biography.xml',
					path: 'templates/biography.xml',
					sha: 'df8924ab45525603b11131084bac46a65e40dd05',
					size: 8969,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/biography.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/biography.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/df8924ab45525603b11131084bac46a65e40dd05',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/biography.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/biography.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/df8924ab45525603b11131084bac46a65e40dd05',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/biography.xml',
					},
				},
				{
					name: 'ceww_new_entry_template.xml',
					path: 'templates/ceww_new_entry_template.xml',
					sha: 'ed224c05b1dd8b2e8053fd880e04c983065698c1',
					size: 12918,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/ceww_new_entry_template.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/ceww_new_entry_template.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/ed224c05b1dd8b2e8053fd880e04c983065698c1',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/ceww_new_entry_template.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/ceww_new_entry_template.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/ed224c05b1dd8b2e8053fd880e04c983065698c1',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/ceww_new_entry_template.xml',
					},
				},
				{
					name: 'cwrcEntry.xml',
					path: 'templates/cwrcEntry.xml',
					sha: '5cc998e21ac16e733e8e2d176ac77b1276651d1a',
					size: 1192,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/cwrcEntry.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/cwrcEntry.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/5cc998e21ac16e733e8e2d176ac77b1276651d1a',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/cwrcEntry.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/cwrcEntry.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/5cc998e21ac16e733e8e2d176ac77b1276651d1a',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/cwrcEntry.xml',
					},
				},
				{
					name: 'letter.xml',
					path: 'templates/letter.xml',
					sha: '1525a783ddcd2844d75677d3748673d749c99963',
					size: 4470,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/letter.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/letter.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/1525a783ddcd2844d75677d3748673d749c99963',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/letter.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/letter.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/1525a783ddcd2844d75677d3748673d749c99963',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/letter.xml',
					},
				},
				{
					name: 'poem.xml',
					path: 'templates/poem.xml',
					sha: '3646f33255208aa71b79ef0a7adaa03af2057ec4',
					size: 9775,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/poem.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/poem.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/3646f33255208aa71b79ef0a7adaa03af2057ec4',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/poem.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/poem.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/3646f33255208aa71b79ef0a7adaa03af2057ec4',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/poem.xml',
					},
				},
				{
					name: 'prose.xml',
					path: 'templates/prose.xml',
					sha: 'abe5f5729d23b51a54ad4098c182bbd3e70b2d79',
					size: 19730,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/prose.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/prose.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/abe5f5729d23b51a54ad4098c182bbd3e70b2d79',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/prose.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/prose.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/abe5f5729d23b51a54ad4098c182bbd3e70b2d79',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/prose.xml',
					},
				},
				{
					name: 'sample_biography.xml',
					path: 'templates/sample_biography.xml',
					sha: '95edb8af9142e198f7b5adda6a2520f606171c1a',
					size: 79937,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_biography.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_biography.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/95edb8af9142e198f7b5adda6a2520f606171c1a',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/sample_biography.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_biography.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/95edb8af9142e198f7b5adda6a2520f606171c1a',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_biography.xml',
					},
				},
				{
					name: 'sample_letter.xml',
					path: 'templates/sample_letter.xml',
					sha: '3018280fedf351a4a9330326cd654382aa80984b',
					size: 20765,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_letter.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_letter.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/3018280fedf351a4a9330326cd654382aa80984b',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/sample_letter.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_letter.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/3018280fedf351a4a9330326cd654382aa80984b',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_letter.xml',
					},
				},
				{
					name: 'sample_poem.xml',
					path: 'templates/sample_poem.xml',
					sha: 'e3fadfac318e076318ffbf69a335470df6a73b42',
					size: 6572,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_poem.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_poem.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/e3fadfac318e076318ffbf69a335470df6a73b42',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/sample_poem.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_poem.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/e3fadfac318e076318ffbf69a335470df6a73b42',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_poem.xml',
					},
				},
				{
					name: 'sample_writing.xml',
					path: 'templates/sample_writing.xml',
					sha: '70f5fa95ddd70ae11aa7413d63369dfcabd4d81f',
					size: 93162,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_writing.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_writing.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/70f5fa95ddd70ae11aa7413d63369dfcabd4d81f',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/sample_writing.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/sample_writing.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/70f5fa95ddd70ae11aa7413d63369dfcabd4d81f',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/sample_writing.xml',
					},
				},
				{
					name: 'writing.xml',
					path: 'templates/writing.xml',
					sha: '978a11166ed998a61e60732597178eea51ae2daf',
					size: 6316,
					url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/writing.xml?ref=master',
					html_url:
						'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/writing.xml',
					git_url:
						'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/978a11166ed998a61e60732597178eea51ae2daf',
					download_url:
						'https://raw.githubusercontent.com/cwrc/CWRC-Writer-Templates/master/templates/writing.xml',
					type: 'file',
					_links: {
						self:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/contents/templates/writing.xml?ref=master',
						git:
							'https://api.github.com/repos/cwrc/CWRC-Writer-Templates/git/blobs/978a11166ed998a61e60732597178eea51ae2daf',
						html:
							'https://github.com/cwrc/CWRC-Writer-Templates/blob/master/templates/writing.xml',
					},
				},
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 14 Mar 2017 00:34:06 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Content-Length',
				'11023',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'60',
				'X-RateLimit-Remaining',
				'59',
				'X-RateLimit-Reset',
				'1489455245',
				'Cache-Control',
				'public, max-age=60, s-maxage=60',
				'Vary',
				'Accept',
				'ETag',
				'"3cf589b0fb08096878dfecd1f6fe3ad1"',
				'Last-Modified',
				'Tue, 02 Feb 2016 23:01:13 GMT',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
				'Access-Control-Allow-Origin',
				'*',
				'Content-Security-Policy',
				"default-src 'none'",
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Content-Type-Options',
				'nosniff',
				'X-Frame-Options',
				'deny',
				'X-XSS-Protection',
				'1; mode=block',
				'Vary',
				'Accept-Encoding',
				'X-Served-By',
				'4c8b2d4732c413f4b9aefe394bd65569',
				'X-GitHub-Request-Id',
				'FC15:DCFF:7FA7785:A336296:58C73A7B',
			]
		);
};

const getDoc = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/repos/lucaju/misc/contents/text.txt')
		.query({
			ref: 'dev',
		})
		.reply(
			200,
			[
				'1f8b0800000000000003ad91c16e83301044ffc5e7085362204242554ffd839c2245c65e825b6323bc3469a2fc7b978a56844b9baad791e77966e7c29c6c81150ce184119e90ad5827b1b95542234958c73a173a493742242a57599a3e24206b59895ca4d946eb3cce9458c78408e64c50b162436fc9d92076a1e05c76',
				'263a186c862a52bee53d743e703b28f932f0d604c59577080e03ff8af3d8435d6a78236683addddff266ac39a5b2bee264faa6909b9e2ecc3f86210b1f5181dfd15cfba3b35eeac567bd3c4ecd8700fd54f3f308f3e08bccf8de8dd3d4c60235984c24e8e7ed593f95e5ce910c4e796ddc81f44a06c804697b6bdc6b60c58505b0f57f0d40f7b807f5a7f38d23cf3ef9f5c0d7eb072f1fb5aaca020000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 03:51:46 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4992',
				'X-RateLimit-Reset',
				'1581393516',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'W/"30d74d258442c7c65512eafab474568dd706c430"',
				'Last-Modified',
				'Mon, 10 Feb 2020 23:43:06 GMT',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'AC3B:5884:60DA5:EF039:5E4224D2',
			]
		);
};

const saveDocExistingSHA = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.post('/graphql', {
			query:
				'{\n\t\t\trepository(owner: "lucaju", name: "misc") {\n\t\t\t\tobject(expression: "dev:text.txt") {\n\t\t\t\t\t... on Blob {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}',
		})
		.reply(
			200,
			[
				'1f8b08000000000000031dc74b0e80200c00d1bbf404082d25dca6b698e006836c0cf1ee7e66f56682c910c8137a39da5947ebd7776ddd8b8e5fd5204370c6689e12a257d648b4f8229bacc8483199b18b8ac1c1fdf600851e1c8555000000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 04:22:06 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'Cache-Control',
				'no-cache',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'repo',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4898',
				'X-RateLimit-Reset',
				'1581397677',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit - Reset, X - OAuth - Scopes, X - Accepted - OAuth - Scopes, X - Poll - Interval, X - GitHub - Media - Type ',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'9BA3:337D:17D35D:31CD82:5E422BEE',
			]
		);
};

const saveDoc = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.put('/repos/lucaju/misc/contents/text.txt', {
			message: 'some commit message',
			sha: '30d74d258442c7c65512eafab474568dd706c430',
			branch: 'dev',
			content:
				'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPFRFSSB4bWxucz0iaHR0cDovL3d3dy50ZWktYy5vcmcvbnMvMS4wIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiIHhtbG5zOnc9Imh0dHA6Ly9jd3JjdGMuYXJ0c3JuLnVhbGJlcnRhLmNhLyMiPgogIDx0ZWlIZWFkZXI+CiAgICA8ZmlsZURlc2M+CiAgICAgIDx0aXRsZVN0bXQ+CiAgICAgICAgPHRpdGxlPlNhbXBsZSBEb2N1bWVudCBUaXRsZSB0ZXN0IHVuZGVmaW5lZDwvdGl0bGU+CiAgICAgIDwvdGl0bGVTdG10PgogICAgICA8cHVibGljYXRpb25TdG10PgogICAgICAgIDxwPjwvcD4KICAgICAgPC9wdWJsaWNhdGlvblN0bXQ+CiAgICAgIDxzb3VyY2VEZXNjIHNhbWVBcz0iaHR0cDovL3d3dy5jd3JjLmNhIj4KICAgICAgICA8cD5DcmVhdGVkIGZyb20gb3JpZ2luYWwgcmVzZWFyY2ggYnkgbWVtYmVycyBvZiBDV1JDL0NTw4lDIHVubGVzcyBvdGhlcndpc2Ugbm90ZWQuPC9wPgogICAgICA8L3NvdXJjZURlc2M+CiAgICA8L2ZpbGVEZXNjPgogIDwvdGVpSGVhZGVyPgogIDx0ZXh0PgogICAgPGJvZHk+CiAgICAgIDxkaXYgdHlwZT0ibGV0dGVyIj4KICAgICAgICA8aGVhZD4KICAgICAgICAgIDx0aXRsZT5TYW1wbGUgTGV0dGVyIC0gQmVydHJhbmQgUnVzc2VsbCB0byA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfNzMiIGNlcnQ9InByb2JhYmxlIiByZWY9IjI3OTM5OTM5OSI+UGF0cmljaWEgU3BlbmNlPC9wZXJzTmFtZT4gLSBPY3RvYmVyIDIxLCAxOTM1PC90aXRsZT4KICAgICAgICA8L2hlYWQ+CiAgICAgICAgPG9wZW5lcj4KICAgICAgICAgIDxub3RlPgogICAgICAgICAgICA8cD5CYWQgd3JpdGluZyBkdWUgdG8gc2hha3kgdHJhaW48L3A+PHA+SW4gdHJhaW48L3A+PHA+CiAgICAgICAgICAgICAgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDMiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY0NTMzNjYiPk9zbG88L3BsYWNlTmFtZT4gdG8gQmVyZ2VuPC9wPgogICAgICAgICAgPC9ub3RlPgogICAgICAgICAgPGRhdGVsaW5lPgogICAgICAgICAgICA8ZGF0ZSBhbm5vdGF0aW9uSWQ9ImVudF82OSIgY2VydD0iZGVmaW5pdGUiIHdoZW49IjE5MzUtMTAtMjEiPjIxLjEwLjM1PC9kYXRlPgogICAgICAgICAgPC9kYXRlbGluZT4KICAgICAgICAgIDxzYWx1dGU+RGVhcmVzdCAtPC9zYWx1dGU+CiAgICAgICAgPC9vcGVuZXI+PHA+SSBoYXZlIGhhZCBubzxub3RlIGFubm90YXRpb25JZD0iZW50XzE5MCIgdHlwZT0icmVzZWFyY2hOb3RlIj4KICAgICAgICAgICAgICAgIDxwIHhtbG5zPSJodHRwOi8vd3d3LnRlaS1jLm9yZy9ucy8xLjAiPlNvbWUga2luZCBvZiBub3RlPC9wPgogICAgICAgICAgICA8L25vdGU+IGxldHRlciBmcm9tIHlvdSBzaW5jZSBJIGxlZnQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDUiIG9mZnNldElkPSJlbnRfMTQ1IiBjZXJ0PSJkZWZpbml0ZSIgcmVmPSJodHRwOi8vd3d3Lmdlb25hbWVzLm9yZy8yNjczNzIyIj5TdG9ja2hvbG08L3BsYWNlTmFtZT4sIGJ1dCBJIGhhZCBhIG5pY2Ugb25lIGZyb20gSm9obiBpbiBhbiBlbnZlbG9wZSB5b3UgaGFkIHNlbnQgaGltLiBJIGhhZCBzZW50IGhpbSBvbmUgYWRkcmVzc2VkIHRvIENvcGVuaGFnZW4gYnV0IGhlIGhhZG4ndCB1c2VkIGl0LjwvcD48cD5XaGVuIEkgcmVhY2hlZCBPc2xvIHllc3RlcmRheSBldmVuaW5nLCBCcnluanVsZiBCdWxsIHNob3VsZCBoYXZlIGJlZW4gdGhlcmUgdG8gbWVldCBtZSwgYnV0IHdhc24ndC4gSGUgaXMgbm90IG9uIHRoZSB0ZWxlcGhvbmUsIHNvIEkgdG9vayBhIHRheGkgdG8gaGlzIGFkZHJlc3MsIHdoaWNoIHR1cm5lZCBvdXQgdG8gYmUgYSBzdHVkZW50cycgY2x1YiB3aXRoIG5vIG9uZSBhYm91dCBvbiBTdW5kYXlzLCBzbyBJIHdlbnQgdG8gYSBob3RlbCBmZWVsaW5nIHJhdGhlciBub24tcGx1c3NlZC4gQnV0IHByZXNlbnRseSBoZSB0dXJuZWQgdXAuIEhlIGhhZCBnb3QgdGhlIDxwYiBuPSIyIj48L3BiPiB0aW1lIG9mIG15IGFycml2YWwgd3JvbmcsIGFuZCAKICAgICAgICAgICAgPGNob2ljZSBhbm5vdGF0aW9uSWQ9ImVudF82NSI+PHNpYyBhbm5vdGF0aW9uSWQ9ImVudF82NSI+d2hlbjwvc2ljPjxjb3JyIGFubm90YXRpb25JZD0iZW50XzY1Ij53aGVuPC9jb3JyPjwvY2hvaWNlPgogICAgICAgICAgaGUgaGFkIGZvdW5kIGhlIGhhZCBtaXNzZWQgbWUgaGUgcGhvbmVkIHRvIGV2ZXJ5IGhvdGVsIGluIE9zbG8gdGlsbCBoZSBoaXQgb24gdGhlIHJpZ2h0IG9uZS4gSGUgbGVmdCBtZSBhdCAxMCwgYW5kIHRoZW4gSSBoYWQgdG8gZG8gYSBTdW5kYXkgUmVmZXJlZSBhcnRpY2xlLiBUb2RheSBteSBqb3VybmV5IGxhc3RzIGZyb20gOSB0aWxsIDkgLSBmb3J0dW5hdGVseSBvbmUgb2YgdGhlIG1vc3QgYmVhdXRpZnVsIHJhaWx3YXkgam91cm5leXMgaW4gdGhlIHdvcmxkLiBUb21vcnJvdyBJIGxlY3R1cmUgYXQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDQiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY1NDg1MjgiPkJlcmdlbjwvcGxhY2VOYW1lPiB0byB0aGUgQW5nbG8tTm9yd2VnaWFuIFNvY2lldHkuIE5leHQgZGF5IEkgZ28gYmFjayB0byBPc2xvLCBsZWN0dXJlIHRoZXJlIEZyaS4gYW5kIFNhdC4gYW5kIHRoZW4gc3RhcnQgZm9yIGhvbWUgdmlhIEJlcmdlbi48L3A+CiAgICAgICAgPHBiIG49IjMiPjwvcGI+CiAgICAgICAgPHA+QnVsbCBpcyBhIG5pY2UgeW91bmcgbWFuIGJ1dCBpbmNvbXBldGVudCAtIGNhbid0IHF1aXRlIHN0YW5kIHRoZSBjb21tdW5pc3RzLCBidXQgZmluZHMgdGhlIHNvY2lhbGlzdHMgdG9vIG1pbGQuPC9wPjxwPkkgYW0gdW5oYXBwaWx5IHdvbmRlcmluZyB3aGF0IHlvdSBhcmUgZmVlbGluZyBhYm91dCBtZS48L3A+CiAgICAgICAgPGNsb3Nlcj4KICAgICAgICAgIDxzYWx1dGU+SSBsb3ZlIHlvdSB2ZXJ5IG11Y2ggLTwvc2FsdXRlPgogICAgICAgICAgPHNpZ25lZD4KICAgICAgICAgICAgPHBlcnNOYW1lIHNhbWVBcz0iaHR0cDovL3d3dy5mcmVlYmFzZS5jb20vdmlldy9lbi9iZXJ0cmFuZF9ydXNzZWxsIj4KICAgICAgICAgICAgICA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfMTA5IiBjZXJ0PSJkZWZpbml0ZSIgdHlwZT0icmVhbCIgcmVmPSJodHRwOi8vdmlhZi5vcmcvdmlhZi8zNjkyNDEzNyI+QjwvcGVyc05hbWU+CiAgICAgICAgICAgIDwvcGVyc05hbWU+CiAgICAgICAgICA8L3NpZ25lZD4KICAgICAgICA8L2Nsb3Nlcj4KICAgICAgPC9kaXY+CiAgICA8L2JvZHk+CiAgPC90ZXh0Pgo8L1RFST4K',
		})
		.reply(
			200,
			[
				'1f8b0800000000000003b555ef6bdb3010fd578a3fa7b52ccbb21528dbc00c36968640caa8c728b2758a95f847b0e43649c9ff3ea9694ada2f8bcbf65127dfbb7bf79ece4f5ed136061ae38d9fbc86d7e08d3d031b736536c61b796b6ecab7115d721b6092875044928580833cc28289580a8e999005c94341421662829085d06a6741c3302123afef2a9b5c1ab3d663dfe76b75b550a6ecf3aba2adfd0ed6adf6abbee0cbdeaf952efc97d6b47fece853',
				'07f25ac083852d4d5dddbfc53bc13a45c9ab36f76dd22b8acdb69fbe4bfe6b3336c57750da1f405eb48f4dd572f1ae58c71f5f98f71aba179acf43386dfc5dcf66bb76ea48558165705fa966a59d6a1a2af9afa66a490e81fad04c9c722745ce566dbf1f59b3d6b56bd1b27ef661223096c0984094d33c48888c1921014972c10211511661295011db8135ad807b256cd224bda333cc4cfeb34293e5b7603a9f6da769b1992ecbd564f9bdcee6ab284bbfe0bb79a626f305ca96457493ce363769a9b274b5c9d25b3c9ddf6eb37af678b72bae2df84063bbb91da8687f0085f33d7f001f82cd7b53b6ddc916f8d1178a37edc5d74eed76d071cb126aae9c7407937eaec159d6c60537ce9918617489f06510cc1119633c4634f35e4533f07fd04d07b6f8d110445086244b688c29084a459cd010278920b9a4284e7810915c90e8639ab95ada3fbb86e55e83d67ce1a6a3db1a2e0eba5c1ca36ec17676f9da77fcebc80071190212226651cc5121e2284f4812b2844492502681f05886087f8cc1d17503aa0c76ddd9d8fbdf23ef013a2555c18d6a1b27e3e10cf69d4a5e6918791d70edaebcbed16ad1d81bf74f5934dcf49d9d6bd357951be3d6add9c371bfdfff013c17a907d7060000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 04:22:07 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4997',
				'X-RateLimit-Reset',
				'1581397692',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'W/"4a51e59922e34e05bea5b53aac960de2"',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'A5C4:2193:1950F0:32B55E:5E422BEE',
			]
		);
};

const masterBranchSHAs = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/repos/lucaju/misc/branches/master')
		.reply(
			200,
			[
				'1f8b0800000000000003ed575d6fda3014fd2b559ee9f2490248d3266dddb46950b1d175639a90ed3860ead899edd052c47fdf75123a60da462aedad0f4810e71c9ffb7dd93802e5d4193839d2862aa7e31099e7cc38838da317080e08c5340e318ee32c265e4c82b8dbcd529f767b419426c4f7fd84264984002a644a672c05d0f0f5d7781cf40dbee6de70f9cebf9c8cd797afc9dd653ee25ff3ab6018bc67a3e5341fe5c35bf8ac47cb2b7f9a8fefa6',
				'93ab68b8fc78330a8677c3c945389d9070f4f6e2f9812e549a85545661a3fd43491812f2ec8d62f7f754592934478c83105e12b42c5fe6f419d805cf5364acb5811778e75e70eef5265e34e88683289e3adb9df1d611ff833da75aa3b9bdff135ad1f40cafcf5e5d7f7c757ead58ed7ba3289cee3c8fa30487999f795980639ca524490214759328f048afebf552084790a614cc2a953576614ca107ae8b0af66ccecca2c4d66a57d1426ab7f6849b334d5c3874ed5dda3df90e70ce232ea99349bb2d92c842a83033224b0169e8759c15552c6304192685f54efd9b429e65886bda711445da1e39a5d06c2ee0a4e3d82fc8940afc294ace3b4e81d65c2200d99fdbf6e63cc29485c9f9ecd06b7b61d90f484dfe0837e923fe7f86bead196e130f0d3efd55785cce9975786d031cd9aaf7836e9484fdc33e308e3f7f1971b2bc588f26e370787f636b19ad9041ea587af550074dea969a2a2285815ca8b2b8741bfe17abe71170cc55c352359c7fd58065dbd500bc7b4a64e0b54c722e6f01792cf5b0c0f6c9dd07cc039e89796b3c6036ae340b0a5e02e95b6b30d3a68d90eafd0dd4ba36d0942d8306ff2a9ab610d32040caad00159baa97545425d644b1c2d6641b510738e0916a8e04bbaf6abb0d0fe06c4656adad853dd5fb80a32b48ab36c01ab0710bc55688acad0b142594411b9fb5263b4202975917762c5c41a8ad73611ccc509adb12ab5adcf1647a2abffdf9f6547e7f9bfe07de792abf65093deca0704f2abf0229db319cc1b7dd76d6ef667e2fea47a48f49e8e3204c7b31c538f4429a90acef4529f6fc14fb40df7271da8de816379c32cfead5afd9344ee6de7e87e633e34cdc80f1603be5599b4d132b24c80216cd87ff1756ea1ec31f1622bb9dee3020a050d25062f676bee649b3125281303fd8087f94cc8e3a1860a6d43390406a03a8c8a422b45a3139746eab45661944a95a36eeaa187fb7fbe1af1bfe3e607e5faf8f8c86a151a9b75ab73f01be9542f0710d0000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 03:11:04 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4996',
				'X-RateLimit-Reset',
				'1581393516',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'W/"80c52110212ee4642bca1231c17623f5"',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'8D03:1F7B:138308:2F807B:5E421B48',
			]
		);
};

const getRepoGetTree = () => {
	return nock('https://api.github.com:443', {
		encodedQueryParams: true,
	})
		.get('/repos/lucaju/misc/git/trees/b47b3f1f0f2b6bfdc772a457420c8508dc062dde')
		.query({
			recursive: '1',
		})
		.reply(
			200,
			[
				'1f8b0800000000000003a5d44d8bdb301006e0ffe2f336d6c7e82bb742f7d65e7a2d3dcc68464d16bb31b60c6997fcf72a14c296bd380dbe6830c3ab4796e7b55b0ed8ed3b8240b6e8a28a214f85730806c105302a47a72267e50db3744fdd3a0fade150ebb4ecfb1ea7e3eec7b11e56dae5d3d8cf329d967e5833beacfd785c72df5e',
				'f6751659fa3b32ae0dddfedb6b37613db4b4afcf1f3f7d79de8ddcf2c753dbc6bed34a798056d75fd3b5a6e144adfacb31da38ef023b9b2d2606431cb9ad8b27b044165081cbce5c1b8ebf5bbbff2fd73573e937875d9e6ea005c76990cf52abccbbf3386c7461f659b18e50b243ab232302971444dae1664b4d0ac545bcb98c32111eb06d0e7c63ab72fcc0a77c070b44233b6226df76df1e6db46ac78a31246d2d66724e92d3379655d63ea0da9cf75e65ee60259d3d5ba51c79a1e43104978d8410bc455f0ca484e2c1e41b2b69131e606dce7bcfb277b01c291d3810241f41c8b61151c80ab3c10c09520405c64a79c3f28fb036e7fdc33ad75d3dd78dff555254da25d3ca2b83a8358ab30886b3641d056d2a6d80b4e246d2ee91efb435edf2bd8db779fd99b10a77fb82c322973f6a7da7b1b3050000',
			],
			[
				'Server',
				'GitHub.com',
				'Date',
				'Tue, 11 Feb 2020 03:11:05 GMT',
				'Content-Type',
				'application/json; charset=utf-8',
				'Transfer-Encoding',
				'chunked',
				'Connection',
				'close',
				'Status',
				'200 OK',
				'X-RateLimit-Limit',
				'5000',
				'X-RateLimit-Remaining',
				'4995',
				'X-RateLimit-Reset',
				'1581393516',
				'Cache-Control',
				'private, max-age=60, s-maxage=60',
				'Vary',
				'Accept, Authorization, Cookie, X-GitHub-OTP',
				'ETag',
				'W/"e8878ae617bed4a9d8f848db30e4a280"',
				'Last-Modified',
				'Sat, 08 Feb 2020 04:53:49 GMT',
				'X-OAuth-Scopes',
				'delete_repo, notifications, repo, user',
				'X-Accepted-OAuth-Scopes',
				'',
				'X-GitHub-Media-Type',
				'github.v3; format=json',
				'Access-Control-Expose-Headers',
				'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
				'Access-Control-Allow-Origin',
				'*',
				'Strict-Transport-Security',
				'max-age=31536000; includeSubdomains; preload',
				'X-Frame-Options',
				'deny',
				'X-Content-Type-Options',
				'nosniff',
				'X-XSS-Protection',
				'1; mode=block',
				'Referrer-Policy',
				'origin-when-cross-origin, strict-origin-when-cross-origin',
				'Content-Security-Policy',
				"default-src 'none'",
				'Vary',
				'Accept-Encoding, Accept',
				'Content-Encoding',
				'gzip',
				'X-GitHub-Request-Id',
				'AF0B:0D70:22C2CF:41A193:5E421B48',
			]
		);
};
module.exports = {
	getDetailsForAuthenticatedUserNock,
	getGithubCommitNock,
	getUpdateGithubCWRCBranchNock,
	getCreateGithubTagNock,
	getGithubTreeNock,
	getCreateGithubRepoNock,
	getMasterBranchFromGithubNock,
	getDocumentFromGithubNock,
	getAnnotationsFromGithubNock,
	getBranchInfoFromGithubNock,
	getReposForGithubUserNock,
	getReposForAuthenticatedUserNock,
	getTemplatesNock,
	getTemplateNock,
	getSearchNock,
	getDoc,
	saveDocExistingSHA,
	saveDoc,
	masterBranchSHAs,
	getRepoGetTree,
};
