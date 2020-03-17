/* eslint-disable quotes */
const nock = require('nock');

const enableAllMocks = () => {

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/repos/lucaju/misc/git/ref/heads%2Fdev')
		.reply(200, ["1f8b08000000000000039d8e3d0f82301086ff4b67e351e54349dc581c08d1a8ab29d7434aa8105a8cc4f8df3de3e6645cdee1de8fe71e62a04aa46f755093d20e34ddc44c5c3b4d67a3d9cab33c3eda93cd9bad2c0ebba9c8f05ed87d", "ab2f9b0d07c7a1e550ed7def5200d59bf9c5f87a2ce7d85918a8ef1cb423aa66046b1c029b7cfd82756543e845fa10ae56bc1604cb2a5a9544611c4788182cc245156a1527898c484aacd6322855c2783ff5c40d8659e3ff7be7d375f033f5f97c01ec6665ba37010000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Mon, 02 Mar 2020 20:57:27 GMT',
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
			'4999',
			'X-RateLimit-Reset',
			'1583186247',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"1e0ea06ce5543c1d648ad29220acd9e3"',
			'Last-Modified',
			'Tue, 11 Feb 2020 21:32:03 GMT',
			'X-Poll-Interval',
			'300',
			'X-OAuth-Scopes',
			'repo, user',
			'X-Accepted-OAuth-Scopes',
			'repo',
			'X-GitHub-Media-Type',
			'github.v3; format=json',
			'Access-Control-Expose-Headers',
			'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset',
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
			'Accept-Encoding, Accept, X-Requested-With',
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'A2C5:18F9:13C9EA2:2958B4E:5E5D7337'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.post('/graphql', {
			"query": "{\n\t\t\trepository(owner: \"lucaju\", name: \"misc\") {\n\t\t\t\tobject(expression: \"dev:text.txt\") {\n\t\t\t\t\t... on Blob {\n\t\t\t\t\t\toid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}"
		})
		.reply(200, ["1f8b08000000000000031dc74b0e80200c00d1bbf404082d25dca6b698e006836c0cf1ee7e66f56682c910c8137a39da5947ebd7776ddd8b8e5fd5204370c6689e12a257d648b4f8229bacc8483199b18b8ac1c1fdf600851e1c8555000000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Mon, 02 Mar 2020 20:57:27 GMT',
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
			'repo, user',
			'X-Accepted-OAuth-Scopes',
			'repo',
			'X-GitHub-Media-Type',
			'github.v3; format=json',
			'X-RateLimit-Limit',
			'5000',
			'X-RateLimit-Remaining',
			'4696',
			'X-RateLimit-Reset',
			'1583184574',
			'Access-Control-Expose-Headers',
			'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset',
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
			'Accept-Encoding, Accept, X-Requested-With',
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'903C:5A77:1317D0D:2853A68:5E5D7337'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.put('/repos/lucaju/misc/contents/text.txt', {
			"message": "some commit message",
			"sha": "30d74d258442c7c65512eafab474568dd706c430",
			"branch": "dev",
			"content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPFRFSSB4bWxucz0iaHR0cDovL3d3dy50ZWktYy5vcmcvbnMvMS4wIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOmN3PSJodHRwOi8vY3dyYy5jYS9ucy9jdyMiIHhtbG5zOnc9Imh0dHA6Ly9jd3JjdGMuYXJ0c3JuLnVhbGJlcnRhLmNhLyMiPgogIDx0ZWlIZWFkZXI+CiAgICA8ZmlsZURlc2M+CiAgICAgIDx0aXRsZVN0bXQ+CiAgICAgICAgPHRpdGxlPlNhbXBsZSBEb2N1bWVudCBUaXRsZSB0ZXN0IHVuZGVmaW5lZDwvdGl0bGU+CiAgICAgIDwvdGl0bGVTdG10PgogICAgICA8cHVibGljYXRpb25TdG10PgogICAgICAgIDxwPjwvcD4KICAgICAgPC9wdWJsaWNhdGlvblN0bXQ+CiAgICAgIDxzb3VyY2VEZXNjIHNhbWVBcz0iaHR0cDovL3d3dy5jd3JjLmNhIj4KICAgICAgICA8cD5DcmVhdGVkIGZyb20gb3JpZ2luYWwgcmVzZWFyY2ggYnkgbWVtYmVycyBvZiBDV1JDL0NTw4lDIHVubGVzcyBvdGhlcndpc2Ugbm90ZWQuPC9wPgogICAgICA8L3NvdXJjZURlc2M+CiAgICA8L2ZpbGVEZXNjPgogIDwvdGVpSGVhZGVyPgogIDx0ZXh0PgogICAgPGJvZHk+CiAgICAgIDxkaXYgdHlwZT0ibGV0dGVyIj4KICAgICAgICA8aGVhZD4KICAgICAgICAgIDx0aXRsZT5TYW1wbGUgTGV0dGVyIC0gQmVydHJhbmQgUnVzc2VsbCB0byA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfNzMiIGNlcnQ9InByb2JhYmxlIiByZWY9IjI3OTM5OTM5OSI+UGF0cmljaWEgU3BlbmNlPC9wZXJzTmFtZT4gLSBPY3RvYmVyIDIxLCAxOTM1PC90aXRsZT4KICAgICAgICA8L2hlYWQ+CiAgICAgICAgPG9wZW5lcj4KICAgICAgICAgIDxub3RlPgogICAgICAgICAgICA8cD5CYWQgd3JpdGluZyBkdWUgdG8gc2hha3kgdHJhaW48L3A+PHA+SW4gdHJhaW48L3A+PHA+CiAgICAgICAgICAgICAgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDMiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY0NTMzNjYiPk9zbG88L3BsYWNlTmFtZT4gdG8gQmVyZ2VuPC9wPgogICAgICAgICAgPC9ub3RlPgogICAgICAgICAgPGRhdGVsaW5lPgogICAgICAgICAgICA8ZGF0ZSBhbm5vdGF0aW9uSWQ9ImVudF82OSIgY2VydD0iZGVmaW5pdGUiIHdoZW49IjE5MzUtMTAtMjEiPjIxLjEwLjM1PC9kYXRlPgogICAgICAgICAgPC9kYXRlbGluZT4KICAgICAgICAgIDxzYWx1dGU+RGVhcmVzdCAtPC9zYWx1dGU+CiAgICAgICAgPC9vcGVuZXI+PHA+SSBoYXZlIGhhZCBubzxub3RlIGFubm90YXRpb25JZD0iZW50XzE5MCIgdHlwZT0icmVzZWFyY2hOb3RlIj4KICAgICAgICAgICAgICAgIDxwIHhtbG5zPSJodHRwOi8vd3d3LnRlaS1jLm9yZy9ucy8xLjAiPlNvbWUga2luZCBvZiBub3RlPC9wPgogICAgICAgICAgICA8L25vdGU+IGxldHRlciBmcm9tIHlvdSBzaW5jZSBJIGxlZnQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDUiIG9mZnNldElkPSJlbnRfMTQ1IiBjZXJ0PSJkZWZpbml0ZSIgcmVmPSJodHRwOi8vd3d3Lmdlb25hbWVzLm9yZy8yNjczNzIyIj5TdG9ja2hvbG08L3BsYWNlTmFtZT4sIGJ1dCBJIGhhZCBhIG5pY2Ugb25lIGZyb20gSm9obiBpbiBhbiBlbnZlbG9wZSB5b3UgaGFkIHNlbnQgaGltLiBJIGhhZCBzZW50IGhpbSBvbmUgYWRkcmVzc2VkIHRvIENvcGVuaGFnZW4gYnV0IGhlIGhhZG4ndCB1c2VkIGl0LjwvcD48cD5XaGVuIEkgcmVhY2hlZCBPc2xvIHllc3RlcmRheSBldmVuaW5nLCBCcnluanVsZiBCdWxsIHNob3VsZCBoYXZlIGJlZW4gdGhlcmUgdG8gbWVldCBtZSwgYnV0IHdhc24ndC4gSGUgaXMgbm90IG9uIHRoZSB0ZWxlcGhvbmUsIHNvIEkgdG9vayBhIHRheGkgdG8gaGlzIGFkZHJlc3MsIHdoaWNoIHR1cm5lZCBvdXQgdG8gYmUgYSBzdHVkZW50cycgY2x1YiB3aXRoIG5vIG9uZSBhYm91dCBvbiBTdW5kYXlzLCBzbyBJIHdlbnQgdG8gYSBob3RlbCBmZWVsaW5nIHJhdGhlciBub24tcGx1c3NlZC4gQnV0IHByZXNlbnRseSBoZSB0dXJuZWQgdXAuIEhlIGhhZCBnb3QgdGhlIDxwYiBuPSIyIj48L3BiPiB0aW1lIG9mIG15IGFycml2YWwgd3JvbmcsIGFuZCAKICAgICAgICAgICAgPGNob2ljZSBhbm5vdGF0aW9uSWQ9ImVudF82NSI+PHNpYyBhbm5vdGF0aW9uSWQ9ImVudF82NSI+d2hlbjwvc2ljPjxjb3JyIGFubm90YXRpb25JZD0iZW50XzY1Ij53aGVuPC9jb3JyPjwvY2hvaWNlPgogICAgICAgICAgaGUgaGFkIGZvdW5kIGhlIGhhZCBtaXNzZWQgbWUgaGUgcGhvbmVkIHRvIGV2ZXJ5IGhvdGVsIGluIE9zbG8gdGlsbCBoZSBoaXQgb24gdGhlIHJpZ2h0IG9uZS4gSGUgbGVmdCBtZSBhdCAxMCwgYW5kIHRoZW4gSSBoYWQgdG8gZG8gYSBTdW5kYXkgUmVmZXJlZSBhcnRpY2xlLiBUb2RheSBteSBqb3VybmV5IGxhc3RzIGZyb20gOSB0aWxsIDkgLSBmb3J0dW5hdGVseSBvbmUgb2YgdGhlIG1vc3QgYmVhdXRpZnVsIHJhaWx3YXkgam91cm5leXMgaW4gdGhlIHdvcmxkLiBUb21vcnJvdyBJIGxlY3R1cmUgYXQgPHBsYWNlTmFtZSBhbm5vdGF0aW9uSWQ9ImVudF8xNDQiIGNlcnQ9ImRlZmluaXRlIiByZWY9Imh0dHA6Ly93d3cuZ2VvbmFtZXMub3JnLzY1NDg1MjgiPkJlcmdlbjwvcGxhY2VOYW1lPiB0byB0aGUgQW5nbG8tTm9yd2VnaWFuIFNvY2lldHkuIE5leHQgZGF5IEkgZ28gYmFjayB0byBPc2xvLCBsZWN0dXJlIHRoZXJlIEZyaS4gYW5kIFNhdC4gYW5kIHRoZW4gc3RhcnQgZm9yIGhvbWUgdmlhIEJlcmdlbi48L3A+CiAgICAgICAgPHBiIG49IjMiPjwvcGI+CiAgICAgICAgPHA+QnVsbCBpcyBhIG5pY2UgeW91bmcgbWFuIGJ1dCBpbmNvbXBldGVudCAtIGNhbid0IHF1aXRlIHN0YW5kIHRoZSBjb21tdW5pc3RzLCBidXQgZmluZHMgdGhlIHNvY2lhbGlzdHMgdG9vIG1pbGQuPC9wPjxwPkkgYW0gdW5oYXBwaWx5IHdvbmRlcmluZyB3aGF0IHlvdSBhcmUgZmVlbGluZyBhYm91dCBtZS48L3A+CiAgICAgICAgPGNsb3Nlcj4KICAgICAgICAgIDxzYWx1dGU+SSBsb3ZlIHlvdSB2ZXJ5IG11Y2ggLTwvc2FsdXRlPgogICAgICAgICAgPHNpZ25lZD4KICAgICAgICAgICAgPHBlcnNOYW1lIHNhbWVBcz0iaHR0cDovL3d3dy5mcmVlYmFzZS5jb20vdmlldy9lbi9iZXJ0cmFuZF9ydXNzZWxsIj4KICAgICAgICAgICAgICA8cGVyc05hbWUgYW5ub3RhdGlvbklkPSJlbnRfMTA5IiBjZXJ0PSJkZWZpbml0ZSIgdHlwZT0icmVhbCIgcmVmPSJodHRwOi8vdmlhZi5vcmcvdmlhZi8zNjkyNDEzNyI+QjwvcGVyc05hbWU+CiAgICAgICAgICAgIDwvcGVyc05hbWU+CiAgICAgICAgICA8L3NpZ25lZD4KICAgICAgICA8L2Nsb3Nlcj4KICAgICAgPC9kaXY+CiAgICA8L2JvZHk+CiAgPC90ZXh0Pgo8L1RFST4K"
		})
		.reply(200, ["1f8b0800000000000003b5555d4fdb3014fd2b28cf85d84e9c3495d0f6506d425aa92a75a0749ad0f557e3928f2a76a014f5bfcfa614155ed6a0edd1d7b9e7de73cff1cd73c09bdacada06a3e7a0864a06a3c0ca8dbdb01b1b0c8235d8e27dc414e00299824872aab24812cc2811994895009209c563168938ca221223e4208cde3ad0281ac683a06b4b975c58bb36a33084b5be586a5b74ec823755d8ca7563c2b2e3b0ea", "c24a1b1ebeb666c243475f5aa92e857c70b085adcabbf7784758c728ac6c58e892de505cb6fbf443f25f9b7129a18732610ff2a279accb06c487622d3cbe32ef8c6c5f69be0ce1b8f10f3ddba7b55747e9523a0677a5aeef8d57cdc852fdaba93a927da03e3513afdc51919355dbed06ceac55e55b74ac5f7c98a28c02a19472c5580282f218c729432a13248524c189101943c20dac6e84bcd3c2254dc67932239965b7259aacaef0743e7b9a8ef966bae28fd3f94d3159fdc4d7b7d7555e5d91fc7686f3ed6c733d167af23da78bf15594cf7332992fee17e3d2c566970ebca7b1fddcf6544cd883c2e99edf83f7c186ce164d7bb4057e745c43dd9c7d6bf5762b5b702c6505da4bb737e9d74a7acbbab800eb9d491041e7283a47644ed088a623325c046fa259f97fd06d2b5df18321dcfe1184c6c0338c632e80c33046221502278a2554a9a16428cd92cf69e66b99f0e41a8e7b258d81a59f8e692a79b6d7e5ec10f50bb675cbd7bde35f070608458a0e9994719250ce39223151b180244d319518739561c420fd1c8383eb7a54e9edba93b177bf07c1836cb5d21cac6e6a2fe3fe2cdd3b55501a39085a09c65f055d6df4b27637fe9fb2acc176ad9b6bdd95a51fe3935fb3fbe36eb7fb033d170a4bd7060000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Mon, 02 Mar 2020 20:57:28 GMT',
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
			'1583186247',
			'Cache-Control',
			'private, max-age=60, s-maxage=60',
			'Vary',
			'Accept, Authorization, Cookie, X-GitHub-OTP',
			'ETag',
			'W/"55ac73e64654da88df074d387f11f186"',
			'X-OAuth-Scopes',
			'repo, user',
			'X-Accepted-OAuth-Scopes',
			'',
			'X-GitHub-Media-Type',
			'github.v3; format=json',
			'Access-Control-Expose-Headers',
			'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset',
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
			'Accept-Encoding, Accept, X-Requested-With',
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'BDB3:2318:A7F6C3:1A6A1F0:5E5D7338'
		]);

	nock('https://api.github.com:443', {
			"encodedQueryParams": true
		})
		.get('/search/issues')
		.query({
			"q": "state%3Aopen%20type%3Apr%20repo%3Alucaju%2Fmisc%20head%3Adev"
		})
		.reply(200, ["1f8b0800000000000003a555ef4fdb3010fd572a7f863a494b2722a169d3d83eb58c8d6d880955ae734d0d8e9df947a18dfabfefec868a76d246d8a728f6bd77e7e7bbe78638ed989c72ed9523797a4484e2baaa2538981ab05e3a4bf239931670cb41857f3f1be28d2439593857db9c52568b7e29dcc2cffa88a5066a6da9f49cdd795a09cba9b0d683a5237244e2a670daaca6dd48102bd90ca4ed88db25a75b784315ab608374586b05cabd9ef08900b960f95f4c5b38f22c5c250f0ef84cd9e79ad65ecaa8a828487e323a494e4783747444942e601ad6c8f8c3f9e3857c9fce3e3d7ebdb9fe98de5c4f92f19aa7e3bb77e9783d5e2156f96a0686e48873c249405429b511dadb5e5ce8cdb5e97dfe82a1de86c086485d0a8571db5ada", "fc6976327c3338ddcf7e39fa7e3d91fcee7c35b9ba1c8cd7f76718cd96cc3173788771d1666d1785545c2b8792c686f2b4e57fbb3c1b2247695a9678cc50dbdfda31b03db5e30b15c6b0b996523f20f2b0d4fd5e7f4e4e77981d5ea8b2331e310dd56e01a812961e3ab514f65f6dba57488c6f68f8602b04068bfa1a283a14d322b0940785553471ac23959f596e44ed84565dd4d9c3218f36255362cdbaf220ce223c1a4987f3c478c4bd6452f7c4dc021a5a1bb1647c152430c0412c51cece640748e472ab3a8cddb7305e282e7aec94155518b1e8ba9b27db43dfbd8df7e842b8ae4161b8d4fc1e70085a8366d68a5201062874071cb6f63f9836822b21c13aad76fb3b03cb13b44303c85d4c19be03244bb2e438c98ed3e15532ccb3619e643798cfd7c59f31d9e02a3d0d318334c470a96d4bd356e1dd429b2916a3b988d78d092e7e4cce83ad041bc387e617be0f98b7f3cb12e0db87e515ce5988f9bc8bd9f60320d4cc1c5f74024604c1bb9ce96285a7b7ba825e505fb85e05d6b212c2e5736df06ed27eb2b9ddfc0615119efe9a070000"], [
			'Server',
			'GitHub.com',
			'Date',
			'Mon, 02 Mar 2020 20:57:29 GMT',
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
			'1583182709',
			'Cache-Control',
			'no-cache',
			'X-OAuth-Scopes',
			'repo, user',
			'X-Accepted-OAuth-Scopes',
			'',
			'X-GitHub-Media-Type',
			'github.v3; format=json',
			'Access-Control-Expose-Headers',
			'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset',
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
			'Accept-Encoding, Accept, X-Requested-With',
			'Content-Encoding',
			'gzip',
			'X-GitHub-Request-Id',
			'806E:19F9:1224998:26A7437:5E5D7338'
		]);

	nock('https://api.github.com:443', {
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
			'Mon, 02 Mar 2020 20:57:20 GMT',
			'Connection',
			'close'
		]);

}

module.exports = enableAllMocks