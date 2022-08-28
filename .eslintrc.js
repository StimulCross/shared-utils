module.exports = {
	extends: [
		'@stimulcross/eslint-config-node/v14',
		'@stimulcross/eslint-config-typescript',
		'@stimulcross/eslint-config-typescript/style'
	],
	root: true,
	parserOptions: {
		project: './tsconfig.json'
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/unified-signatures': 'off'
	}
};
