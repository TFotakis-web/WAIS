export const pageStructure = {
	namespaced: true,
	state: {
		pageTitle: '',
		pageBackButton: false,
	},
	mutations: {
		setPageTitle(state, payload) {
			state.pageTitle = payload;
		},
		setPageBackButton(state, payload) {
			state.pageBackButton = payload;
		}
	},
	actions: {},
	getters: {
		pageTitle: (state) => state.pageTitle,
		pageBackButton: (state) => state.pageBackButton,
	},
};
