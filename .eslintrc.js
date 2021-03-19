module.exports = {
	root: true,
	env: {
		node: true,
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-unused-vars': 'warn',
		'no-unused-labels': 'warn',
		'no-empty': 'warn',
		'vue/custom-event-name-casing': 'off',
		'vue/experimental-script-setup-vars': 'off',
		'vue/no-mutating-props': 'off',
		'vue/no-unused-components': 'warn',
		'vue/no-deprecated-slot-attribute': 'off'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};
