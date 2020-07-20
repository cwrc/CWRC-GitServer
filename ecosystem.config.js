module.exports = {
	apps: [
		{
			name: 'cwrc-gitserver',
            script: './server/index.mjs',
            args: '--no-daemon',
			env: {
				NODE_ENV: 'production',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
