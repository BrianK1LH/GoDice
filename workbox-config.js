module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,png,html,md,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};