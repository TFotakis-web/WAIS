const initState = () => ({
	pageTitle: () => 'WAIS',
	pageBackButton: false,
	backButtonDefaultHref: '/',
	metaTitle: document.querySelector('head title'),
	globalPendingPromises: 0,
	routerViewPendingPromises: 0,
	localesLoaded: false,
	dirtyInputs: 0,
});

export const pageStructure = {
	namespaced: true,
	state: initState(),
	mutations: {
		init(state) {
			Object.assign(state, initState());
		},
		setPageTitle(state, payload) {
			state.pageTitle = payload;
			state.metaTitle.textContent = payload ? `${payload()} | WAIS` : 'WAIS';
		},
		setPageBackButton(state, payload) {
			state.pageBackButton = payload;
		},
		setBackButtonDefaultHref(state, payload) {
			state.backButtonDefaultHref = payload;
		},
		increaseGlobalPendingPromises(state) {
			state.globalPendingPromises++;
		},
		decreaseGlobalPendingPromises(state) {
			state.globalPendingPromises--;
			if (state.globalPendingPromises < 0) {
				console.error('Pending Promises:', state.globalPendingPromises);
				state.globalPendingPromises = 0;
			}
		},
		increaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises++;
		},
		decreaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises--;
			if (state.routerViewPendingPromises < 0) {
				console.error('Pending Promises:', state.routerViewPendingPromises);
				state.routerViewPendingPromises = 0;
			}
		},
		setLocalesLoaded(state, loaded) {
			state.localesLoaded = loaded;
		},
		increaseDirtyInputs(state) {
			state.dirtyInputs++;
		},
		decreaseDirtyInputs(state) {
			state.dirtyInputs--;
			if (state.dirtyInputs < 0) {
				console.error('Dirty Inputs:', state.dirtyInputs);
				state.dirtyInputs = 0;
			}
		},
		clearDirtyInputs(state) {
			state.dirtyInputs = 0;
		},
	},
	actions: {},
	getters: {
		pageTitle: (state) => state.pageTitle,
		pageBackButton: (state) => state.pageBackButton,
		backButtonDefaultHref: (state) => state.backButtonDefaultHref,
		globalPendingPromises: (state) => state.globalPendingPromises,
		routerViewPendingPromises: (state) => state.routerViewPendingPromises,
		localesLoaded: (state) => state.localesLoaded,
		pageInputsDirty: (state) => state.pageInputsDirty,
		dirtyInputs: (state) => state.dirtyInputs,
	},
};
