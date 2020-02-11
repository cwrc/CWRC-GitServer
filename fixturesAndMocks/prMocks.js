/* eslint-disable quotes */
const nock = require('nock');

const enableAllMocks = () => {

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/repos/lucaju/misc/git/ref/heads/dev')
		.reply(200, ["1f8b08000000000000039d8e3d0f82301086ff4b67e309e1ab246c2c0e8468d4d5945e81122a84162331fc77cfb839199777b8f7e3b9279b54cdd2b75a6895400ba8ee6cc36e03aaab46b28abc88cee6628a6eef95a7c352e6f2519a638f4d9651709e7a0ab5ce8d3605", "10a3de36dab573b5958381498d83857e96a29bc1682b814cba7ec186aa53d2b1f4c96c2b682d41dfaf15e7b88b4454794950c73c08bc20a9907b18463cf46bdcc998f06e1915350866b4fbef9d4fd7c2cfd4757d01b3e16e1737010000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Tue, 11 Feb 2020 04:44:46 GMT',
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
			'4986',
			'X-RateLimit-Reset',
			'1581397691',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"9c30856e19e6217f311be0dbe822b537"',
			'Last-Modified',
			'Sat, 08 Feb 2020 04:53:49 GMT',
			'X-Poll-Interval',
			'300',
			'X-OAuth-Scopes',
			'delete_repo, notifications, repo, user',
			'X-Accepted-OAuth-Scopes',
			'repo',
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
			'820B:34D6:177EBE:39379E:5E42313E'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.post('/graphql', {
			"query": "{\n\t\t\trepository(owner: \"lucaju\", name: \"misc\") {\n\t\t\t\tobject(expression: \"dev:text.txt\") {\n\t\t\t\t\t... on Blob {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}"
		})
		.reply(200, ["1f8b08000000000000031dc74b0e80200c00d1bbf404d8624cb94da16d821b0cb231c4bbfb99d59b092a43204de876b4b38ed6afef5adead8c5f552101bb9095d5990c97bca2b26eae82ac5e62268dc4843104b8df1e44b3d74655000000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Tue, 11 Feb 2020 04:44:47 GMT',
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
			'4796',
			'X-RateLimit-Reset',
			'1581397678',
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
			'A4B1:670C:2A0C7F:50193C:5E42313F'
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
		.reply(200, ["1f8b0800000000000003b5555d6bdb3014fd2bc5cf692ddbb26c05caf690b514e6848e4248c728b274152b93ed60c9fd48c97f9fd43425edcbe2b2815f74e57bee3df71c5f3f07bc6d2c3436183f070dab211807161eed997db4c12858335bbd8f988ab900952c019e4a9a401c95692ca8c8a460311592e3321138a1498c117210466d1c6892e47814f49d76c995b56b330e43b656674b65abbe3ce36d1d76b06e4da87bce567d582bc3c3d7d64cb8efe8", "4b07f25cc0bd83ad6cadefdee31d601da294ba2d4397f486e2b2ddab1f92ffda8c4b093d9409079017ed43a35b263e14ebd8c32bf3de40f74af36508878d7fe8d93eadbd3a5269700ceeb46a7e1baf9a012dffd5541dc921509f9a8957eea0c8d1aa6db72367d6baf62d3ad62f3e149c89124b8a9824198e4a9c109644799eb39483c851c920a23ce26e604d2be04e0997544c16e43aa6b69c6b54acaea2d9cdf5d36cc21f67f58fd562fe434d2f17697179514f571c15f32b546c6eab62f30dcf2655359d4ff5ed64f9b0a82f7471a357c5bc3877e0038dede7b6a362c201148ef7fc0e7c0836eb6dd576075be07bcf156bda938b4e6d36d031c7126aa6bc743b937eadc15bd6c505b3de99318ad1298a4fa3e806e131764f761bbc8966e1ffa0db0e5cf1bd21b02014499a932c26200811594e9238cf052e254159cea2149702a79fd3ccd732e1d1351cf71a8c614b3f1dd3d670b2d3e5641ff50bb673cbd77dc73ff70c7211c712281588305246399619c538c2792968245242d3580ac4b3cf31d8bb6e4095c1ae3b1a7bfb6b14dc43a7a4e2ccaab6f132eecee0be53c9b48151d00133fe2ae81ba3968dbbf1ff9465c36cdfb9b936bdd67e8c4f7ecdee8edbedf60f9e15b80cd7060000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Tue, 11 Feb 2020 04:44:48 GMT',
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
			'4985',
			'X-RateLimit-Reset',
			'1581397692',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"4610252b4972110f01a0d923b2105b3e"',
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
			'A381:443F:16F6DA:371368:5E42313F'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/search/issues')
		.query({
			"q": "state%3Aopen%20type%3Apr%20repo%3Alucaju%2Fmisc%20head%3Adev"
		})
		.reply(200, ["1f8b0800000000000003a555ef6fda3010fd57903f539ca4a12b91aa6953bb7d82ae1bdbba4e55641c13dc3a76e61fb410f1bfef6c5254d0b4359d848462df7b777ebe7b6e905596889c2a272dcae23ee292aaaa16ccb25c33e38435289b1361186c5956c1d7cf06392d508616d6d626c398d47c5072bb70b30160b166b53258384aee1caeb8a1981be398c129eaa3b0c9add2abbc1b0960059931613ae276c9f116de60492ab6013aa8b562d2be9ef08900b8d8f2bf98b670e059d84a1c1cf099b2cf35ad9d1041515ea06c78929c8e86c928ea23a90a96fb35343ebf78bc14efe3d9c7c72f37d71fe29beb49345ed3f5e4fcdd703cfdb102ac74d58c6994a57d64b9150c50a5509a2b677a61a13757baf7e933843ae3031b2454c925c46d6b69f3c7c9307d733cdacf7e75", "f2ed7a22e8ddc56a32bd3a1eafefcf209a2c8925faf00ec3a249da2ef2a9a89216240d0de570cbff7679e64f5cea96251cd3d7f6b776f46c4fedf84285216cae84500f803c2c75bfd79f93e31d6687e7b2ec8c074c83955d3050094af79d5a72f3af36dd2b24c437d8ff412b780603fa6a567428a64540290f12aa68c258072a373354f3da7225bba8b387031ea54b22f99a74e5019c017830920ee709f1807bc9a4ee89b90534b8d67c49e8ca4ba019657c097276263b4002975dd57eecbefaf10271c1637352547ec482eb6e9e6c0f7cf736dca3f5e1aa6612c285a2f70c86a03568620c2f25830009ee00c3d67e7bd30670c5053356c9ddfecec032300eaa197017398177002551121d45c9511c4d93e32c4db224bd817cae2efe10134fa3344be177ea63a850a6a569ab7076a1740ec528cac3754382cbef930b6f2bdec6e0a1f905ef03e4edfcb278f8f661798573167c3eef62b6030ff035134b179d800181e02e67aa58c1e98daa58cfabcf6daf62c69092f9cba74ac3ddc4836873bbf90d107c20f99a070000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Tue, 11 Feb 2020 04:44:48 GMT',
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
			'1581396348',
			'Cache-Control',
			'no-cache',
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
			'A8BB:7B03:2BD4BC:5465EB:5E423140'
		]);

	nock('http://127.0.0.1:61149', {
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
			'Tue, 11 Feb 2020 04:44:49 GMT',
			'Connection',
			'close'
		]);

}

module.exports = enableAllMocks