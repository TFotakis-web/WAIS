export const pageStructure = {
	namespaced: true,
	state: {
		pageTitle: () => 'WAIS',
		pageBackButton: false,
		backButtonDefaultHref: '/',
		metaTitle: document.querySelector('head title')
	},
	mutations: {
		setPageTitle(state, payload) {
			state.pageTitle = payload;
			state.metaTitle.textContent = payload ? `${payload()} | WAIS` : 'WAIS';
		},
		setPageBackButton(state, payload) {
			state.pageBackButton = payload;
		},
		setBackButtonDefaultHref(state, payload) {
			state.backButtonDefaultHref = payload;
		}
	},
	actions: {},
	getters: {
		pageTitle: (state) => state.pageTitle,
		pageBackButton: (state) => state.pageBackButton,
		backButtonDefaultHref: (state) => state.backButtonDefaultHref,
	},
};
