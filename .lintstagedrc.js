module.exports = {
	'{apps,packages}/*.{js,ts,jsx,tsx,html,css,json,md}': 'prettier --config ".prettierrc.js" --write ',
	'apps/api/*.{js,ts}': 'eslint --config apps/api/.eslintrc.js '
};
