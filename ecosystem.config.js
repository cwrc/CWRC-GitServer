module.exports = {
	apps: [
		{
			name: 'cwrc-gitserver',
            script: './bin/www',
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
