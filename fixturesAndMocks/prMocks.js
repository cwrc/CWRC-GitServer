/* eslint-disable quotes */
const nock = require('nock');
const config = require('../config');
// const fixtures = require('./fixtures.js');

function enableAllMocks() {

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/repos/lucaju/misc/git/refs/heads/dev')
		.query({
			"access_token": config.personal_oath_for_testing
		})
		.reply(200, ["1f8b08000000000000039d8f310f82301085ff4b674305634949d8581c08d1a8aba1bd034aa8105a8c84f0df3de3e6645c6eb8f7de7def163662c592f774bcc1121c077cb00dbbf780370324e5592e2ef66af3f61016e7e35c64fa59d85307759a92711a3b3235de0f2ee1bc1c4c501bdf4c2ad0bde5230ebde3dda4cb76e2d638cd49a4ed17ac", "572d6acf9285b9a6a46b10aa7d2871abc52e864a2344a14019cb2adec62ad202f64249a924e1fd3c202508668dffafce274b8fff4a5dd71750bd306a37010000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Sun, 02 Feb 2020 05:37:47 GMT',
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
			'4968',
			'X-RateLimit-Reset',
			'1580621890',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"2a0a598640f78a7040132164e17f2f87"',
			'Last-Modified',
			'Tue, 28 Jan 2020 04:57:45 GMT',
			'X-Poll-Interval',
			'300',
			'X-OAuth-Scopes',
			'admin:repo_hook, repo',
			'X-Accepted-OAuth-Scopes',
			'repo',
			'X-GitHub-Media-Type',
			'github.v3; param=text-match; format=json',
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
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'BD7D:33BA:72C7EE:1219B63:5E36602A'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.post('/graphql', {
			"query": "{\n\t\t\trepository(owner: \"lucaju\", name: \"misc\") {\n\t\t\t\tobject(expression: \"dev:text.txt\") {\n\t\t\t\t\t... on Blob {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}"
		})
		.query({
			"access_token": config.personal_oath_for_testing
		})
		.reply(200, ["1f8b08000000000000031dc74b0e80200c00d1bbf404d8624cb94da16d821b0cb231c4bbfb99d59b092a43204de876b4b38ed6afef5adead8c5f552101bb9095d5990c97bca2b26eae82ac5e62268dc4843104b8df1e44b3d74655000000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Sun, 02 Feb 2020 05:37:47 GMT',
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
			'admin:repo_hook, repo',
			'X-Accepted-OAuth-Scopes',
			'repo',
			'X-GitHub-Media-Type',
			'github.v3; param=text-match; format=json',
			'X-RateLimit-Limit',
			'5000',
			'X-RateLimit-Remaining',
			'4386',
			'X-RateLimit-Reset',
			'1580621905',
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
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'95D0:3C31:43C4FD:A3C07D:5E36602B'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.put('/repos/lucaju/misc/contents/text.txt', {
			"message": "some commit message",
			"sha": "9fa3ec5f93e21b52d9d7fda29dfc4b3d43932400",
			"branch": "dev",
			"content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPFRFSSB4bWxucz0iaHR0cDovL3d3dy50ZWktYy5vcmcvbnMvMS4wIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiIHhtbG5zOnc9Imh0dHA6Ly9jd3JjdGMuYXJ0c3JuLnVhbGJlcnRhLmNhLyMiPgogIDx0ZWlIZWFkZXI+CiAgICA8ZmlsZURlc2M+CiAgICAgIDx0aXRsZVN0bXQ+CiAgICAgICAgPHRpdGxlPlNhbXBsZSBEb2N1bWVudCBUaXRsZSB0ZXN0IHVuZGVmaW5lZDwvdGl0bGU+CiAgICAgIDwvdGl0bGVTdG10PgogICAgICA8cHVibGljYXRpb25TdG10PgogICAgICAgIDxwPjwvcD4KICAgICAgPC9wdWJsaWNhdGlvblN0bXQ+CiAgICAgIDxzb3VyY2VEZXNjIHNhbWVBcz0iaHR0cDovL3d3dy5jd3JjLmNhIj4KICAgICAgICA8cD5DcmVhdGVkIGZyb20gb3JpZ2luYWwgcmVzZWFyY2ggYnkgbWVtYmVycyBvZiBDV1JDL0NTw4lDIHVubGVzcyBvdGhlcndpc2Ugbm90ZWQuPC9wPgogICAgICA8L3NvdXJjZURlc2M+CiAgICA8L2ZpbGVEZXNjPgogIDwvdGVpSGVhZGVyPgogIDx0ZXh0PgogICAgPGJvZHk+CiAgICAgIDxkaXYgdHlwZT0ibGV0dGVyIj4KICAgICAgICA8aGVhZD4KICAgICAgICAgIDx0aXRsZT5TYW1wbGUgTGV0dGVyIC0gQmVydHJhbmQgUnVzc2VsbCB0byA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfNzMiIGNlcnQ9InByb2JhYmxlIiByZWY9IjI3OTM5OTM5OSI+UGF0cmljaWEgU3BlbmNlPC9wZXJzTmFtZT4gLSBPY3RvYmVyIDIxLCAxOTM1PC90aXRsZT4KICAgICAgICA8L2hlYWQ+CiAgICAgICAgPG9wZW5lcj4KICAgICAgICAgIDxub3RlPgogICAgICAgICAgICA8cD5CYWQgd3JpdGluZyBkdWUgdG8gc2hha3kgdHJhaW48L3A+PHA+SW4gdHJhaW48L3A+PHA+CiAgICAgICAgICAgICAgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDMiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY0NTMzNjYiPk9zbG88L3BsYWNlTmFtZT4gdG8gQmVyZ2VuPC9wPgogICAgICAgICAgPC9ub3RlPgogICAgICAgICAgPGRhdGVsaW5lPgogICAgICAgICAgICA8ZGF0ZSBhbm5vdGF0aW9uSWQ9ImVudF82OSIgY2VydD0iZGVmaW5pdGUiIHdoZW49IjE5MzUtMTAtMjEiPjIxLjEwLjM1PC9kYXRlPgogICAgICAgICAgPC9kYXRlbGluZT4KICAgICAgICAgIDxzYWx1dGU+RGVhcmVzdCAtPC9zYWx1dGU+CiAgICAgICAgPC9vcGVuZXI+PHA+SSBoYXZlIGhhZCBubzxub3RlIGFubm90YXRpb25JZD0iZW50XzE5MCIgdHlwZT0icmVzZWFyY2hOb3RlIj4KICAgICAgICAgICAgICAgIDxwIHhtbG5zPSJodHRwOi8vd3d3LnRlaS1jLm9yZy9ucy8xLjAiPlNvbWUga2luZCBvZiBub3RlPC9wPgogICAgICAgICAgICA8L25vdGU+IGxldHRlciBmcm9tIHlvdSBzaW5jZSBJIGxlZnQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDUiIG9mZnNldElkPSJlbnRfMTQ1IiBjZXJ0PSJkZWZpbml0ZSIgcmVmPSJodHRwOi8vd3d3Lmdlb25hbWVzLm9yZy8yNjczNzIyIj5TdG9ja2hvbG08L3BsYWNlTmFtZT4sIGJ1dCBJIGhhZCBhIG5pY2Ugb25lIGZyb20gSm9obiBpbiBhbiBlbnZlbG9wZSB5b3UgaGFkIHNlbnQgaGltLiBJIGhhZCBzZW50IGhpbSBvbmUgYWRkcmVzc2VkIHRvIENvcGVuaGFnZW4gYnV0IGhlIGhhZG4ndCB1c2VkIGl0LjwvcD48cD5XaGVuIEkgcmVhY2hlZCBPc2xvIHllc3RlcmRheSBldmVuaW5nLCBCcnluanVsZiBCdWxsIHNob3VsZCBoYXZlIGJlZW4gdGhlcmUgdG8gbWVldCBtZSwgYnV0IHdhc24ndC4gSGUgaXMgbm90IG9uIHRoZSB0ZWxlcGhvbmUsIHNvIEkgdG9vayBhIHRheGkgdG8gaGlzIGFkZHJlc3MsIHdoaWNoIHR1cm5lZCBvdXQgdG8gYmUgYSBzdHVkZW50cycgY2x1YiB3aXRoIG5vIG9uZSBhYm91dCBvbiBTdW5kYXlzLCBzbyBJIHdlbnQgdG8gYSBob3RlbCBmZWVsaW5nIHJhdGhlciBub24tcGx1c3NlZC4gQnV0IHByZXNlbnRseSBoZSB0dXJuZWQgdXAuIEhlIGhhZCBnb3QgdGhlIDxwYiBuPSIyIj48L3BiPiB0aW1lIG9mIG15IGFycml2YWwgd3JvbmcsIGFuZCAKICAgICAgICAgICAgPGNob2ljZSBhbm5vdGF0aW9uSWQ9ImVudF82NSI+PHNpYyBhbm5vdGF0aW9uSWQ9ImVudF82NSI+d2hlbjwvc2ljPjxjb3JyIGFubm90YXRpb25JZD0iZW50XzY1Ij53aGVuPC9jb3JyPjwvY2hvaWNlPgogICAgICAgICAgaGUgaGFkIGZvdW5kIGhlIGhhZCBtaXNzZWQgbWUgaGUgcGhvbmVkIHRvIGV2ZXJ5IGhvdGVsIGluIE9zbG8gdGlsbCBoZSBoaXQgb24gdGhlIHJpZ2h0IG9uZS4gSGUgbGVmdCBtZSBhdCAxMCwgYW5kIHRoZW4gSSBoYWQgdG8gZG8gYSBTdW5kYXkgUmVmZXJlZSBhcnRpY2xlLiBUb2RheSBteSBqb3VybmV5IGxhc3RzIGZyb20gOSB0aWxsIDkgLSBmb3J0dW5hdGVseSBvbmUgb2YgdGhlIG1vc3QgYmVhdXRpZnVsIHJhaWx3YXkgam91cm5leXMgaW4gdGhlIHdvcmxkLiBUb21vcnJvdyBJIGxlY3R1cmUgYXQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDQiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY1NDg1MjgiPkJlcmdlbjwvcGxhY2VOYW1lPiB0byB0aGUgQW5nbG8tTm9yd2VnaWFuIFNvY2lldHkuIE5leHQgZGF5IEkgZ28gYmFjayB0byBPc2xvLCBsZWN0dXJlIHRoZXJlIEZyaS4gYW5kIFNhdC4gYW5kIHRoZW4gc3RhcnQgZm9yIGhvbWUgdmlhIEJlcmdlbi48L3A+CiAgICAgICAgPHBiIG49IjMiPjwvcGI+CiAgICAgICAgPHA+QnVsbCBpcyBhIG5pY2UgeW91bmcgbWFuIGJ1dCBpbmNvbXBldGVudCAtIGNhbid0IHF1aXRlIHN0YW5kIHRoZSBjb21tdW5pc3RzLCBidXQgZmluZHMgdGhlIHNvY2lhbGlzdHMgdG9vIG1pbGQuPC9wPjxwPkkgYW0gdW5oYXBwaWx5IHdvbmRlcmluZyB3aGF0IHlvdSBhcmUgZmVlbGluZyBhYm91dCBtZS48L3A+CiAgICAgICAgPGNsb3Nlcj4KICAgICAgICAgIDxzYWx1dGU+SSBsb3ZlIHlvdSB2ZXJ5IG11Y2ggLTwvc2FsdXRlPgogICAgICAgICAgPHNpZ25lZD4KICAgICAgICAgICAgPHBlcnNOYW1lIHNhbWVBcz0iaHR0cDovL3d3dy5mcmVlYmFzZS5jb20vdmlldy9lbi9iZXJ0cmFuZF9ydXNzZWxsIj4KICAgICAgICAgICAgICA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfMTA5IiBjZXJ0PSJkZWZpbml0ZSIgdHlwZT0icmVhbCIgcmVmPSJodHRwOi8vdmlhZi5vcmcvdmlhZi8zNjkyNDEzNyI+QjwvcGVyc05hbWU+CiAgICAgICAgICAgIDwvcGVyc05hbWU+CiAgICAgICAgICA8L3NpZ25lZD4KICAgICAgICA8L2Nsb3Nlcj4KICAgICAgPC9kaXY+CiAgICA8L2JvZHk+CiAgPC90ZXh0Pgo8L1RFST4K"
		})
		.query({
			"access_token": config.personal_oath_for_testing
		})
		.reply(200, ["1f8b0800000000000003b5555d6bdb3014fd2bc5cf592d4bb61505caf6d0750ce686424671c728b23e12a5fe0896dc262ef9efbb6a9292f66571d9c02fbef23df79e7b8eae9f03d1d44ed52e983c0735af5430099c5abb73b776c1285871b7781bb10b0e01a6395122d18c281c1509964c522d3966528bb82032268ce0182180b0a6075042c6f128e8da129217ceadec240cf9ca9ccf8d5b74c5b968aab055abc6866527f8b20b2b6345b86fcd86878e3eb74a5f48f508b00b5795f76ff18eb08e518ab22942487a45816cf8f45df2", "5f9b8194d043d9700079d93cd565c3e5bb622d7fda33efac6af7345f8670dcf8bb9edd66e5d5d1a654c0e0be34f583f5aa5955ea7f3555203904ea4333f1ca1d153959b5ed760466ad2adf22b07ef121a5388d18d76942c694085a143ca529621413164524165a214dc70406563752dd1b0949d9659ede60e68adb1265cbefd17476b3995e8af5742948b6ccd7d3dbabea7af9b387589ff7d2e4d5577cdde74fd399d864fdc33a9b6528c77765f62d27d3cbec02c0071adbcf6d47c58603289ceef91df8106cdeb945d31e6d811f9d30bc6eceae5ad3f7aae5c05255dc78e97626fd52296f59884beebc3331c2e813c2f0cc5032217412d3bbe05534a7fe0fba6b15143f18224dc69120221114c58a161a698e629d0a2c514465ca108bc6484b7f833ea099af65c3936b00f74a59cbe77e3ab6a9d4d94e97b343d42fd816962fdce35f070612f669c4141229a1b04d95c451aa18659a225a6091ca242d182bd8c7181c5c37a0ca60d79d8cbdfd3d0a1e556bb411dc99a6f632eede15dc53cd4bab4641abb8f54741575b33afe1c4ff53e635775d0b73adbbb2f463dcf835bb7bdd6eb77f00b4c08052d7060000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Sun, 02 Feb 2020 05:37:48 GMT',
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
			'4967',
			'X-RateLimit-Reset',
			'1580621890',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"1d72717cd775697f46a36b3defdac4c7"',
			'X-OAuth-Scopes',
			'admin:repo_hook, repo',
			'X-Accepted-OAuth-Scopes',
			'',
			'X-GitHub-Media-Type',
			'github.v3; param=text-match; format=json',
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
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'8CEA:6F7A:4462EA:A0BB1D:5E36602B'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/search/issues')
		.query({
			"access_token": config.personal_oath_for_testing,
			"q": "state%3Aopen%20type%3Apr%20repo%3Alucaju%2Fmisc%20head%3Adev"
		})
		.reply(200, ["1f8b0800000000000003a555ef4fdb3010fd572a7f863a495ba091d0b409b64f94b1751b6342919b5c53836367fe512851fff79ddd50d17ed808fb1425b9f7eefceeeeb921565926b25c3969491a1f102e7355d5022c641a8c13d69074ce8401fc65a1c2b75f0d715a90942cacad4d4a29ab79bfe476e1667dc4520db53254b89cdd395a7193536e8c0343637240c24f6e955e65dd48102bd80c84e988db26a71b784325ab608d74586b05d2be9df09900b960f95f4c1b38f22c6c25f60ef842d9979ad64e88a0282f483a1a8dc6c7c9c9787c40a42a20f3dfc8c5d9f9e3a5f810cf3e3d7ebdb9fe18df5c4fa28ba79f83cbb3f3c164fafe01b1d25533d0a1ef965b01882a85d25c39d30b1f7a73a57b9fbf60a8333eb02142955c62dca696367f9c8c86c783bdec5747dfaf2722bf3b5f4da657838ba7fb538c664b6699deef61f86892768a7caa5c", "498b92868172b4e57fb73c1d2247a95b96704c5fdbdfc6d1b33d8fe32b15c6b0b912423d2072bfd4dd597f494eb7982d9ecbb2331e310d557601a81296ee27b5e4e65f63ba5348886fa87fe028780683fa6a283a14d322b0940789553461ad03959b995cf3da7225bba8b383431ea54b26f913ebca833883f060241dce13e211f79a4ddd1173036868adf992e52b2f81861cf812e5ec4cb687442ebbaafdda7df3eb85e2a2c766aca8fc8a05d75d3fdb1efaee6de8a3f5e1aa0689e142e5f7804bd01a34338697123040a23be0b2b5efdeb4115c7101c62ab9fdbf35b034423bd480dc45c6f01e2049944487517c989c4ca3611a8fd3e4e806f3b9bad88f490ea3641a8dd2c1713a3cf131b950a6a569ab7076a17486c5a89c87766382cb1f93736f2bdec6f0a2f98df703e6ed7cb378f8e662798373167c3eef62b67d0ff035339b2f3a010382602f67aa58e1e98daaa0e7d5e7b6578131ac04dffc5c69ec4ddcc76e5878b459e56110bab7be5dff01d75ca84bac070000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Sun, 02 Feb 2020 05:37:49 GMT',
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
			'29',
			'X-RateLimit-Reset',
			'1580621928',
			'Cache-Control',
			'no-cache',
			'X-OAuth-Scopes',
			'admin:repo_hook, repo',
			'X-Accepted-OAuth-Scopes',
			'',
			'X-GitHub-Media-Type',
			'github.v3; param=text-match; format=json',
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
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'8EAB:33BA:72C813:1219B9C:5E36602C'
		]);


	nock('http://127.0.0.1:58904', {
			"encodedQueryParams": true
		})
		.put('/github/repos/lucaju/misc/pr', {
			"owner": "lucaju",
			"repo": "misc",
			"content": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<TEI xmlns=\"http://www.tei-c.org/ns/1.0\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:cw=\"http://cwrc.ca/ns/cw#\" xmlns:w=\"http://cwrctc.artsrn.ualberta.ca/#\">\n  <teiHeader>\n    <fileDesc>\n      <titleStmt>\n        <title>Sample Document Title test undefined</title>\n      </titleStmt>\n      <publicationStmt>\n        <p></p>\n      </publicationStmt>\n      <sourceDesc sameAs=\"http://www.cwrc.ca\">\n        <p>Created from original research by members of CWRC/CSÉC unless otherwise noted.</p>\n      </sourceDesc>\n    </fileDesc>\n  </teiHeader>\n  <text>\n    <body>\n      <div type=\"letter\">\n        <head>\n          <title>Sample Letter - Bertrand Russell to <persName annotationId=\"ent_73\" cert=\"probable\" ref=\"279399399\">Patricia Spence</persName> - October 21, 1935</title>\n        </head>\n        <opener>\n          <note>\n            <p>Bad writing due to shaky train</p><p>In train</p><p>\n              <placeName annotationId=\"ent_143\" cert=\"definite\" ref=\"http://www.geonames.org/6453366\">Oslo</placeName> to Bergen</p>\n          </note>\n          <dateline>\n            <date annotationId=\"ent_69\" cert=\"definite\" when=\"1935-10-21\">21.10.35</date>\n          </dateline>\n          <salute>Dearest -</salute>\n        </opener><p>I have had no<note annotationId=\"ent_190\" type=\"researchNote\">\n                <p xmlns=\"http://www.tei-c.org/ns/1.0\">Some kind of note</p>\n            </note> letter from you since I left <placeName annotationId=\"ent_145\" offsetId=\"ent_145\" cert=\"definite\" ref=\"http://www.geonames.org/2673722\">Stockholm</placeName>, but I had a nice one from John in an envelope you had sent him. I had sent him one addressed to Copenhagen but he hadn't used it.</p><p>When I reached Oslo yesterday evening, Brynjulf Bull should have been there to meet me, but wasn't. He is not on the telephone, so I took a taxi to his address, which turned out to be a students' club with no one about on Sundays, so I went to a hotel feeling rather non-plussed. But presently he turned up. He had got the <pb n=\"2\"></pb> time of my arrival wrong, and \n            <choice annotationId=\"ent_65\"><sic annotationId=\"ent_65\">when</sic><corr annotationId=\"ent_65\">when</corr></choice>\n          he had found he had missed me he phoned to every hotel in Oslo till he hit on the right one. He left me at 10, and then I had to do a Sunday Referee article. Today my journey lasts from 9 till 9 - fortunately one of the most beautiful railway journeys in the world. Tomorrow I lecture at <placeName annotationId=\"ent_144\" cert=\"definite\" ref=\"http://www.geonames.org/6548528\">Bergen</placeName> to the Anglo-Norwegian Society. Next day I go back to Oslo, lecture there Fri. and Sat. and then start for home via Bergen.</p>\n        <pb n=\"3\"></pb>\n        <p>Bull is a nice young man but incompetent - can't quite stand the communists, but finds the socialists too mild.</p><p>I am unhappily wondering what you are feeling about me.</p>\n        <closer>\n          <salute>I love you very much -</salute>\n          <signed>\n            <persName sameAs=\"http://www.freebase.com/view/en/bertrand_russell\">\n              <persName annotationId=\"ent_109\" cert=\"definite\" type=\"real\" ref=\"http://viaf.org/viaf/36924137\">B</persName>\n            </persName>\n          </signed>\n        </closer>\n      </div>\n    </body>\n  </text>\n</TEI>\n",
			"message": "some commit message",
			"title": "a title for the pull request",
			"branch": "dev",
			"path": "text.txt"
		})
		.reply(200, {
			"owner": "lucaju",
			"repo": "misc",
			"path": "text.txt",
			"content": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<TEI xmlns=\"http://www.tei-c.org/ns/1.0\" xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:cw=\"http://cwrc.ca/ns/cw#\" xmlns:w=\"http://cwrctc.artsrn.ualberta.ca/#\">\n  <teiHeader>\n    <fileDesc>\n      <titleStmt>\n        <title>Sample Document Title test undefined</title>\n      </titleStmt>\n      <publicationStmt>\n        <p></p>\n      </publicationStmt>\n      <sourceDesc sameAs=\"http://www.cwrc.ca\">\n        <p>Created from original research by members of CWRC/CSÉC unless otherwise noted.</p>\n      </sourceDesc>\n    </fileDesc>\n  </teiHeader>\n  <text>\n    <body>\n      <div type=\"letter\">\n        <head>\n          <title>Sample Letter - Bertrand Russell to <persName annotationId=\"ent_73\" cert=\"probable\" ref=\"279399399\">Patricia Spence</persName> - October 21, 1935</title>\n        </head>\n        <opener>\n          <note>\n            <p>Bad writing due to shaky train</p><p>In train</p><p>\n              <placeName annotationId=\"ent_143\" cert=\"definite\" ref=\"http://www.geonames.org/6453366\">Oslo</placeName> to Bergen</p>\n          </note>\n          <dateline>\n            <date annotationId=\"ent_69\" cert=\"definite\" when=\"1935-10-21\">21.10.35</date>\n          </dateline>\n          <salute>Dearest -</salute>\n        </opener><p>I have had no<note annotationId=\"ent_190\" type=\"researchNote\">\n                <p xmlns=\"http://www.tei-c.org/ns/1.0\">Some kind of note</p>\n            </note> letter from you since I left <placeName annotationId=\"ent_145\" offsetId=\"ent_145\" cert=\"definite\" ref=\"http://www.geonames.org/2673722\">Stockholm</placeName>, but I had a nice one from John in an envelope you had sent him. I had sent him one addressed to Copenhagen but he hadn't used it.</p><p>When I reached Oslo yesterday evening, Brynjulf Bull should have been there to meet me, but wasn't. He is not on the telephone, so I took a taxi to his address, which turned out to be a students' club with no one about on Sundays, so I went to a hotel feeling rather non-plussed. But presently he turned up. He had got the <pb n=\"2\"></pb> time of my arrival wrong, and \n            <choice annotationId=\"ent_65\"><sic annotationId=\"ent_65\">when</sic><corr annotationId=\"ent_65\">when</corr></choice>\n          he had found he had missed me he phoned to every hotel in Oslo till he hit on the right one. He left me at 10, and then I had to do a Sunday Referee article. Today my journey lasts from 9 till 9 - fortunately one of the most beautiful railway journeys in the world. Tomorrow I lecture at <placeName annotationId=\"ent_144\" cert=\"definite\" ref=\"http://www.geonames.org/6548528\">Bergen</placeName> to the Anglo-Norwegian Society. Next day I go back to Oslo, lecture there Fri. and Sat. and then start for home via Bergen.</p>\n        <pb n=\"3\"></pb>\n        <p>Bull is a nice young man but incompetent - can't quite stand the communists, but finds the socialists too mild.</p><p>I am unhappily wondering what you are feeling about me.</p>\n        <closer>\n          <salute>I love you very much -</salute>\n          <signed>\n            <persName sameAs=\"http://www.freebase.com/view/en/bertrand_russell\">\n              <persName annotationId=\"ent_109\" cert=\"definite\" type=\"real\" ref=\"http://viaf.org/viaf/36924137\">B</persName>\n            </persName>\n          </signed>\n        </closer>\n      </div>\n    </body>\n  </text>\n</TEI>\n",
			"branch": "dev",
			"message": "some commit message",
			"title": "a title for the pull request",
			"sha": "9fa3ec5f93e21b52d9d7fda29dfc4b3d43932400"
		}, [
			'X-Powered-By',
			'Express',
			'Access-Control-Allow-Origin',
			'https://localhost',
			'Access-Control-Allow-Methods',
			'GET,PUT,POST,OPTIONS,DELETE',
			'Access-Control-Allow-Headers',
			'cwrc-token, Content-Type',
			'Access-Control-Allow-Credentials',
			'true',
			'Content-Type',
			'application/json; charset=utf-8',
			'Content-Length',
			'3705',
			'ETag',
			'W/"e79-Dv59m9At1naI1vVUpNzNKHlnMFk"',
			'Date',
			'Sun, 02 Feb 2020 05:37:48 GMT',
			'Connection',
			'close'
		]);



	// nock('https://api.github.com:443', {
	// 		"encodedQueryParams": true
	// 	})
	// 	.get('/repos/jchartrand/aTest/git/refs/heads/jchartrand')
	// 	.query({
	// 		"access_token": config.personal_oath_for_testing
	// 	})
	// 	.reply(200, ["1f8b0800000000000003a58ec10e82301044ffa567c3024204bec31fd8dd2e1622b669978321fcbb255e3c7830f132979979339b89329ae1d0044ed02698d961d4880f6b4e668df7ec3ad59006000c53719bd4ad54b05f204af09f79c0ab24859cc8d6779ea75958cdb099e43093f9cc225cb5d452d5d6a51d65245b777dd975c80dd6427dc97469f2157d06391a7e5926fde3da1b90e0e7e97d7f01cdfdf73926010000"], ['Server',
	// 		'GitHub.com',
	// 		'Date',
	// 		'Fri, 25 May 2018 16:48:41 GMT',
	// 		'Content-Type',
	// 		'application/json; charset=utf-8',
	// 		'Transfer-Encoding',
	// 		'chunked',
	// 		'Connection',
	// 		'close',
	// 		'Status',
	// 		'200 OK',
	// 		'X-RateLimit-Limit',
	// 		'5000',
	// 		'X-RateLimit-Remaining',
	// 		'4987',
	// 		'X-RateLimit-Reset',
	// 		'1527267709',
	// 		'Cache-Control',
	// 		'private, max-age=60, s-maxage=60',
	// 		'Vary',
	// 		'Accept, Authorization, Cookie, X-GitHub-OTP',
	// 		'ETag',
	// 		'W/"9e1004fa1d318f5220e2693bab2127fd"',
	// 		'Last-Modified',
	// 		'Tue, 01 May 2018 13:10:09 GMT',
	// 		'X-Poll-Interval',
	// 		'300',
	// 		'X-OAuth-Scopes',
	// 		'repo',
	// 		'X-Accepted-OAuth-Scopes',
	// 		'repo',
	// 		'X-GitHub-Media-Type',
	// 		'github.v3; format=json',
	// 		'Access-Control-Expose-Headers',
	// 		'ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
	// 		'Access-Control-Allow-Origin',
	// 		'*',
	// 		'Strict-Transport-Security',
	// 		'max-age=31536000; includeSubdomains; preload',
	// 		'X-Frame-Options',
	// 		'deny',
	// 		'X-Content-Type-Options',
	// 		'nosniff',
	// 		'X-XSS-Protection',
	// 		'1; mode=block',
	// 		'Referrer-Policy',
	// 		'origin-when-cross-origin, strict-origin-when-cross-origin',
	// 		'Content-Security-Policy',
	// 		'default-src \'none\'',
	// 		'X-Runtime-rack',
	// 		'0.044328',
	// 		'Content-Encoding',
	// 		'gzip',
	// 		'X-GitHub-Request-Id',
	// 		'A450:3F8C:E3A8B9:1F0153A:5B083E69'
	// 	]);

	// nock('https://api.github.com:443', {
	// 		"encodedQueryParams": true
	// 	})
	// 	.post('/graphql', {
	// 		"query": "{\n\t\t\trepository(owner: \"jchartrand\", name: \"aTest\") {\n\t\t\t\tobject(expression: \"jchartrand:curt/qurt/test.txt\") {\n\t\t\t\t\t... on Blob {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}"
	// 	})
	// 	.query({
	// 		"access_token": config.personal_oath_for_testing
	// 	})
	// 	.reply(200, ["1f8b08000000000000031dc74b0e80200c00d1bbf404d8624cb94da16d821b0cb231c4bbfb99d59b092a43204de876b4b38ed6afef5adead8c5f552101bb9095d5990c97bca2b26eae82ac5e62268dc4843104b8df1e44b3d74655000000"], ['Server',
	// 		'GitHub.com',
	// 		'Date',
	// 		'Fri, 25 May 2018 16:48:41 GMT',
	// 		'Content-Type',
	// 		'application/json; charset=utf-8',
	// 		'Transfer-Encoding',
	// 		'chunked',
	// 		'Connection',
	// 		'close',
	// 		'Status',
	// 		'200 OK',
	// 		'X-RateLimit-Limit',
	// 		'5000',
	// 		'X-RateLimit-Remaining',
	// 		'4998',
	// 		'X-RateLimit-Reset',
	// 		'1527270412',
	// 		'Cache-Control',
	// 		'no-cache',
	// 		'X-OAuth-Scopes',
	// 		'repo',
	// 		'X-Accepted-OAuth-Scopes',
	// 		'repo',
	// 		'X-GitHub-Media-Type',
	// 		'github.v3; format=json',
	// 		'Access-Control-Expose-Headers',
	// 		'ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
	// 		'Access-Control-Allow-Origin',
	// 		'*',
	// 		'Strict-Transport-Security',
	// 		'max-age=31536000; includeSubdomains; preload',
	// 		'X-Frame-Options',
	// 		'deny',
	// 		'X-Content-Type-Options',
	// 		'nosniff',
	// 		'X-XSS-Protection',
	// 		'1; mode=block',
	// 		'Referrer-Policy',
	// 		'origin-when-cross-origin, strict-origin-when-cross-origin',
	// 		'Content-Security-Policy',
	// 		'default-src \'none\'',
	// 		'X-Runtime-rack',
	// 		'0.077948',
	// 		'Content-Encoding',
	// 		'gzip',
	// 		'X-GitHub-Request-Id',
	// 		'ABB2:3F8D:1414479:28FE460:5B083E69'
	// 	]);

	// nock('https://api.github.com:443', {
	// 		"encodedQueryParams": true
	// 	})
	// 	.put('/repos/jchartrand/aTest/contents/curt/qurt/test.txt', {
	// 		"message": "some commit message",
	// 		"sha": "9fa3ec5f93e21b52d9d7fda29dfc4b3d43932400",
	// 		"branch": "jchartrand",
	// 		"content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPFRFSSB4bWxucz0iaHR0cDovL3d3dy50ZWktYy5vcmcvbnMvMS4wIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiIHhtbG5zOnc9Imh0dHA6Ly9jd3JjdGMuYXJ0c3JuLnVhbGJlcnRhLmNhLyMiPgogIDx0ZWlIZWFkZXI+CiAgICA8ZmlsZURlc2M+CiAgICAgIDx0aXRsZVN0bXQ+CiAgICAgICAgPHRpdGxlPlNhbXBsZSBEb2N1bWVudCBUaXRsZSB0ZXN0IHVuZGVmaW5lZDwvdGl0bGU+CiAgICAgIDwvdGl0bGVTdG10PgogICAgICA8cHVibGljYXRpb25TdG10PgogICAgICAgIDxwPjwvcD4KICAgICAgPC9wdWJsaWNhdGlvblN0bXQ+CiAgICAgIDxzb3VyY2VEZXNjIHNhbWVBcz0iaHR0cDovL3d3dy5jd3JjLmNhIj4KICAgICAgICA8cD5DcmVhdGVkIGZyb20gb3JpZ2luYWwgcmVzZWFyY2ggYnkgbWVtYmVycyBvZiBDV1JDL0NTw4lDIHVubGVzcyBvdGhlcndpc2Ugbm90ZWQuPC9wPgogICAgICA8L3NvdXJjZURlc2M+CiAgICA8L2ZpbGVEZXNjPgogIDwvdGVpSGVhZGVyPgogIDx0ZXh0PgogICAgPGJvZHk+CiAgICAgIDxkaXYgdHlwZT0ibGV0dGVyIj4KICAgICAgICA8aGVhZD4KICAgICAgICAgIDx0aXRsZT5TYW1wbGUgTGV0dGVyIC0gQmVydHJhbmQgUnVzc2VsbCB0byA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfNzMiIGNlcnQ9InByb2JhYmxlIiByZWY9IjI3OTM5OTM5OSI+UGF0cmljaWEgU3BlbmNlPC9wZXJzTmFtZT4gLSBPY3RvYmVyIDIxLCAxOTM1PC90aXRsZT4KICAgICAgICA8L2hlYWQ+CiAgICAgICAgPG9wZW5lcj4KICAgICAgICAgIDxub3RlPgogICAgICAgICAgICA8cD5CYWQgd3JpdGluZyBkdWUgdG8gc2hha3kgdHJhaW48L3A+PHA+SW4gdHJhaW48L3A+PHA+CiAgICAgICAgICAgICAgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDMiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY0NTMzNjYiPk9zbG88L3BsYWNlTmFtZT4gdG8gQmVyZ2VuPC9wPgogICAgICAgICAgPC9ub3RlPgogICAgICAgICAgPGRhdGVsaW5lPgogICAgICAgICAgICA8ZGF0ZSBhbm5vdGF0aW9uSWQ9ImVudF82OSIgY2VydD0iZGVmaW5pdGUiIHdoZW49IjE5MzUtMTAtMjEiPjIxLjEwLjM1PC9kYXRlPgogICAgICAgICAgPC9kYXRlbGluZT4KICAgICAgICAgIDxzYWx1dGU+RGVhcmVzdCAtPC9zYWx1dGU+CiAgICAgICAgPC9vcGVuZXI+PHA+SSBoYXZlIGhhZCBubzxub3RlIGFubm90YXRpb25JZD0iZW50XzE5MCIgdHlwZT0icmVzZWFyY2hOb3RlIj4KICAgICAgICAgICAgICAgIDxwIHhtbG5zPSJodHRwOi8vd3d3LnRlaS1jLm9yZy9ucy8xLjAiPlNvbWUga2luZCBvZiBub3RlPC9wPgogICAgICAgICAgICA8L25vdGU+IGxldHRlciBmcm9tIHlvdSBzaW5jZSBJIGxlZnQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDUiIG9mZnNldElkPSJlbnRfMTQ1IiBjZXJ0PSJkZWZpbml0ZSIgcmVmPSJodHRwOi8vd3d3Lmdlb25hbWVzLm9yZy8yNjczNzIyIj5TdG9ja2hvbG08L3BsYWNlTmFtZT4sIGJ1dCBJIGhhZCBhIG5pY2Ugb25lIGZyb20gSm9obiBpbiBhbiBlbnZlbG9wZSB5b3UgaGFkIHNlbnQgaGltLiBJIGhhZCBzZW50IGhpbSBvbmUgYWRkcmVzc2VkIHRvIENvcGVuaGFnZW4gYnV0IGhlIGhhZG4ndCB1c2VkIGl0LjwvcD48cD5XaGVuIEkgcmVhY2hlZCBPc2xvIHllc3RlcmRheSBldmVuaW5nLCBCcnluanVsZiBCdWxsIHNob3VsZCBoYXZlIGJlZW4gdGhlcmUgdG8gbWVldCBtZSwgYnV0IHdhc24ndC4gSGUgaXMgbm90IG9uIHRoZSB0ZWxlcGhvbmUsIHNvIEkgdG9vayBhIHRheGkgdG8gaGlzIGFkZHJlc3MsIHdoaWNoIHR1cm5lZCBvdXQgdG8gYmUgYSBzdHVkZW50cycgY2x1YiB3aXRoIG5vIG9uZSBhYm91dCBvbiBTdW5kYXlzLCBzbyBJIHdlbnQgdG8gYSBob3RlbCBmZWVsaW5nIHJhdGhlciBub24tcGx1c3NlZC4gQnV0IHByZXNlbnRseSBoZSB0dXJuZWQgdXAuIEhlIGhhZCBnb3QgdGhlIDxwYiBuPSIyIj48L3BiPiB0aW1lIG9mIG15IGFycml2YWwgd3JvbmcsIGFuZCAKICAgICAgICAgICAgPGNob2ljZSBhbm5vdGF0aW9uSWQ9ImVudF82NSI+PHNpYyBhbm5vdGF0aW9uSWQ9ImVudF82NSI+d2hlbjwvc2ljPjxjb3JyIGFubm90YXRpb25JZD0iZW50XzY1Ij53aGVuPC9jb3JyPjwvY2hvaWNlPgogICAgICAgICAgaGUgaGFkIGZvdW5kIGhlIGhhZCBtaXNzZWQgbWUgaGUgcGhvbmVkIHRvIGV2ZXJ5IGhvdGVsIGluIE9zbG8gdGlsbCBoZSBoaXQgb24gdGhlIHJpZ2h0IG9uZS4gSGUgbGVmdCBtZSBhdCAxMCwgYW5kIHRoZW4gSSBoYWQgdG8gZG8gYSBTdW5kYXkgUmVmZXJlZSBhcnRpY2xlLiBUb2RheSBteSBqb3VybmV5IGxhc3RzIGZyb20gOSB0aWxsIDkgLSBmb3J0dW5hdGVseSBvbmUgb2YgdGhlIG1vc3QgYmVhdXRpZnVsIHJhaWx3YXkgam91cm5leXMgaW4gdGhlIHdvcmxkLiBUb21vcnJvdyBJIGxlY3R1cmUgYXQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDQiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY1NDg1MjgiPkJlcmdlbjwvcGxhY2VOYW1lPiB0byB0aGUgQW5nbG8tTm9yd2VnaWFuIFNvY2lldHkuIE5leHQgZGF5IEkgZ28gYmFjayB0byBPc2xvLCBsZWN0dXJlIHRoZXJlIEZyaS4gYW5kIFNhdC4gYW5kIHRoZW4gc3RhcnQgZm9yIGhvbWUgdmlhIEJlcmdlbi48L3A+CiAgICAgICAgPHBiIG49IjMiPjwvcGI+CiAgICAgICAgPHA+QnVsbCBpcyBhIG5pY2UgeW91bmcgbWFuIGJ1dCBpbmNvbXBldGVudCAtIGNhbid0IHF1aXRlIHN0YW5kIHRoZSBjb21tdW5pc3RzLCBidXQgZmluZHMgdGhlIHNvY2lhbGlzdHMgdG9vIG1pbGQuPC9wPjxwPkkgYW0gdW5oYXBwaWx5IHdvbmRlcmluZyB3aGF0IHlvdSBhcmUgZmVlbGluZyBhYm91dCBtZS48L3A+CiAgICAgICAgPGNsb3Nlcj4KICAgICAgICAgIDxzYWx1dGU+SSBsb3ZlIHlvdSB2ZXJ5IG11Y2ggLTwvc2FsdXRlPgogICAgICAgICAgPHNpZ25lZD4KICAgICAgICAgICAgPHBlcnNOYW1lIHNhbWVBcz0iaHR0cDovL3d3dy5mcmVlYmFzZS5jb20vdmlldy9lbi9iZXJ0cmFuZF9ydXNzZWxsIj4KICAgICAgICAgICAgICA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfMTA5IiBjZXJ0PSJkZWZpbml0ZSIgdHlwZT0icmVhbCIgcmVmPSJodHRwOi8vdmlhZi5vcmcvdmlhZi8zNjkyNDEzNyI+QjwvcGVyc05hbWU+CiAgICAgICAgICAgIDwvcGVyc05hbWU+CiAgICAgICAgICA8L3NpZ25lZD4KICAgICAgICA8L2Nsb3Nlcj4KICAgICAgPC9kaXY+CiAgICA8L2JvZHk+CiAgPC90ZXh0Pgo8L1RFST4K"
	// 	})
	// 	.query({
	// 		"access_token": config.personal_oath_for_testing
	// 	})
	// 	.reply(200, ["1f8b0800000000000003b5954d6fdb300c86ff4aa0731adbb26ccb01860dd86de79e360c052551b13b7f6492bcae2bf2df4735499b353be403bd18b064f1215fbe949f981e87804360cb2736408f6cc902fab008bf039bb335848656f4e442f2333e0ef67c03b4555bc85117b6ce9167aae0a6369535c06b63b550b911799d7391a614ccb77f287c9e4b316793ebe87013c2da2f9304d6ed62d58666520b3df689c3f5e8937bdd800b0e0693c02da594ec32f5c9713a1f1dda0faf0708d684bebbfb977240388aadba511d128f11149302bc09795ae2742e89009f9ca196191f866e04f386e8e06127d5e4d1ed247956eda8a68385", "ff96131ed7b1ddb6ed908abbebdae1878f36f0d8d9f76d0e097236e02211a30b0e48573a60b399d3b8f47dcc9e647af63fd605a02e45990b69adcd4b50bce015ca221799b4358d0317c25a52f812cfc7aab7489f9c813ad3fd5bc23900984233ba834be30bdd1d7ef6793fb2542ef6d046f1eff5e265923fade262b42b7d602044fff13493376971c38bdbac5c0ab914fc2b7b513ae0fb5282434a62df4d53555925539d73cd4b6d6a50699a01486374a16ca9244ac4da882bba19813e3919444290b01e56512a3ff638db366bb65f8d97b4a30b9c46f7dbbe0c9d6b449d15aa5059c15363d12ac3659d4a095a004755a75a55d794b137e519a8cb4c793260f37dce7ea16b6dab21b4e310bbba7d47c396163a8f73e6107cdc62d3e0dbd5403bf1bfb41a204c8e141ea6ae8b823ec69b77fbbad96cfe0247aee76c25070000"], ['Server',
	// 		'GitHub.com',
	// 		'Date',
	// 		'Fri, 25 May 2018 16:48:42 GMT',
	// 		'Content-Type',
	// 		'application/json; charset=utf-8',
	// 		'Transfer-Encoding',
	// 		'chunked',
	// 		'Connection',
	// 		'close',
	// 		'Status',
	// 		'200 OK',
	// 		'X-RateLimit-Limit',
	// 		'5000',
	// 		'X-RateLimit-Remaining',
	// 		'4986',
	// 		'X-RateLimit-Reset',
	// 		'1527267709',
	// 		'Cache-Control',
	// 		'private, max-age=60, s-maxage=60',
	// 		'Vary',
	// 		'Accept, Authorization, Cookie, X-GitHub-OTP',
	// 		'ETag',
	// 		'W/"1033d9694ff48e11f883e439510fa73c"',
	// 		'X-OAuth-Scopes',
	// 		'repo',
	// 		'X-Accepted-OAuth-Scopes',
	// 		'',
	// 		'X-GitHub-Media-Type',
	// 		'github.v3; format=json',
	// 		'Access-Control-Expose-Headers',
	// 		'ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
	// 		'Access-Control-Allow-Origin',
	// 		'*',
	// 		'Strict-Transport-Security',
	// 		'max-age=31536000; includeSubdomains; preload',
	// 		'X-Frame-Options',
	// 		'deny',
	// 		'X-Content-Type-Options',
	// 		'nosniff',
	// 		'X-XSS-Protection',
	// 		'1; mode=block',
	// 		'Referrer-Policy',
	// 		'origin-when-cross-origin, strict-origin-when-cross-origin',
	// 		'Content-Security-Policy',
	// 		'default-src \'none\'',
	// 		'X-Runtime-rack',
	// 		'0.709055',
	// 		'Content-Encoding',
	// 		'gzip',
	// 		'X-GitHub-Request-Id',
	// 		'9B1B:3F8D:1414495:28FE48D:5B083E6A'
	// 	]);

	// nock('https://api.github.com:443', {
	// 		"encodedQueryParams": true
	// 	})
	// 	.get('/search/issues')
	// 	.query({
	// 		"access_token": config.personal_oath_for_testing,
	// 		"q": "state%3Aopen%20type%3Apr%20repo%3Ajchartrand%2FaTest%20head%3Ajchartrand"
	// 	})
	// 	.reply(200, ["1f8b0800000000000003a595516fd33010c7bf4ae5e7ae6ed2a64c91104fbc02424348a02972936b6270ec609f3b95a8df9db39b755b2b01c99ea224f7fff97cbefbbb676850a8a2345e23cb933993ba346da700a1b0e0bc42c7f29d500ee817424b6fdf7be6ad62396b103b97732e3ab9a825367ebb202db7d019c77f948db06885aeb8b803875c3ae7c1f194cd598c9068eca198402280125b506e8af89c063f317aae450b476252ea2d687c25f5914240d8bf1e776210acc1565decf759c9af8add79a562a965c5f2559aae969be4763d67dab75bb02c4fe70c252aa053ac95b1d278378b1f663b63679f3e93d2bb10d833656aa929ee698d019baddf249b6ccec45ea0b09787113fbad5d01801561a8d5491d8239e9fd4eff66fd784abed0009e9b2b0f8df1a2cc09e37d888f250e8ce28651e887099f1cb2ebe5c849f756786d4f52406e97a6eb0012a1a6d25345f2dddbf3aef2aa1a8e9797814b20a144725b7508d4c6a50514a0f9ab2e9e30047", "9cdfbad2ca0ea5d163abf5424b2c636ba1e56f3185455a4788e81a23f71635a4fd9f59bc2af049d4f3cecabd280fa124164a907b2af124e0859a7878e8c20c7e09b3460527872d44d586798b9e7b7cb43a72ddfb78be18c24d079ac295297f020dcc60cfc239596ba0004dd34f7339bc07cb26712b15d9b0d1e7ff67abca97e47e16885d15826e01962e93db9b6576932477c92acfb27cbdfe46ebf9aeba8e49b3bb6493af377916634a65dc8019b2f0d8185b5032a694f1f869818f5f3fbc0f1e136c8aae995f7431d0bad3ee95c0385d2b533db292bbdd686f5d0455d882c0b219af8e3246e7bb35d5812ae24c0bb3702212672d38276a080d511a4be7952c96c7fbe31ff38d2afeac070000"], ['Server',
	// 		'GitHub.com',
	// 		'Date',
	// 		'Fri, 25 May 2018 16:48:42 GMT',
	// 		'Content-Type',
	// 		'application/json; charset=utf-8',
	// 		'Transfer-Encoding',
	// 		'chunked',
	// 		'Connection',
	// 		'close',
	// 		'Status',
	// 		'200 OK',
	// 		'X-RateLimit-Limit',
	// 		'30',
	// 		'X-RateLimit-Remaining',
	// 		'29',
	// 		'X-RateLimit-Reset',
	// 		'1527266982',
	// 		'Cache-Control',
	// 		'no-cache',
	// 		'X-OAuth-Scopes',
	// 		'repo',
	// 		'X-Accepted-OAuth-Scopes',
	// 		'',
	// 		'X-GitHub-Media-Type',
	// 		'github.v3; format=json',
	// 		'Access-Control-Expose-Headers',
	// 		'ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
	// 		'Access-Control-Allow-Origin',
	// 		'*',
	// 		'Strict-Transport-Security',
	// 		'max-age=31536000; includeSubdomains; preload',
	// 		'X-Frame-Options',
	// 		'deny',
	// 		'X-Content-Type-Options',
	// 		'nosniff',
	// 		'X-XSS-Protection',
	// 		'1; mode=block',
	// 		'Referrer-Policy',
	// 		'origin-when-cross-origin, strict-origin-when-cross-origin',
	// 		'Content-Security-Policy',
	// 		'default-src \'none\'',
	// 		'X-Runtime-rack',
	// 		'0.105161',
	// 		'Content-Encoding',
	// 		'gzip',
	// 		'X-GitHub-Request-Id',
	// 		'83DA:3F8C:E3A92A:1F01623:5B083E6A'
	// 	]);



}

module.exports = enableAllMocks