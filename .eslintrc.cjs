// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			files: ['*.ts'],
			parserOptions: {
				project: path.join(__dirname, 'tsconfig.json'),
			},
			rules: {
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/no-floating-promises': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/unbound-method': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-namespace': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: path.join(__dirname, 'tsconfig.json'),
	},
	plugins: ['@typescript-eslint'],
	extends: ['plugin:@typescript-eslint/recommended'],
	rules: {
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
	},
};

module.exports = config;
