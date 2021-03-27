export const pageStructure = {
	namespaced: true,
	state: {
		pageTitle: () => 'WAIS',
		pageBackButton: false,
		backButtonDefaultHref: '/',
		metaTitle: document.querySelector('head title'),
		globalPendingPromises: 0,
		routerViewPendingPromises: 0,
		localesLoaded: false,
	},
	mutations: {
		init(state) {
			state.pageTitle = () => 'WAIS';
			state.pageBackButton = false;
			state.backButtonDefaultHref = '/';
			state.metaTitle = document.querySelector('head title');
			state.globalPendingPromises = 0;
			state.routerViewPendingPromises = 0;
			state.localesLoaded = false;
			console.log('Init pageStructure');
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
			}
		},
		increaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises++;
		},
		decreaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises--;
			if (state.routerViewPendingPromises < 0) {
				console.error('Pending Promises:', state.routerViewPendingPromises);
			}
		},
		setLocalesLoaded(state, loaded) {
			state.localesLoaded = loaded;
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
	},
};
