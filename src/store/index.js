import { createStore } from 'vuex';
import { pageStructure } from '@/store/pageStructure';
import { auth } from '@/store/auth';
import { request } from '@/store/request';
// import { vehicle } from '@/store/vehicle';
// import { trade } from '@/store/trade';
// import { platformData } from '@/store/platformData';

import { API, graphqlOperation } from 'aws-amplify';
import { echo, me } from '@/graphql/custom-queries';

export const store = createStore({
	modules: {
		pageStructure,
		auth,
		request,
		// vehicle,
		// trade,
		// platformData
	},
	state: {
		globalPendingPromises: 0,
		localesLoaded: false,
		routerViewPendingPromises: 0,
	},
	mutations: {
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
	actions: {
		echo() {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(echo, { msg: 'Hello from echo' }))
					.then((response) => {
						console.log('Echo response:', response);
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		me() {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(me))
					.then((response) => {
						console.log('Me response:', response);
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
	},
	getters: {
		globalPendingPromises: (state) => state.globalPendingPromises,
		routerViewPendingPromises: (state) => state.routerViewPendingPromises,
		localesLoaded: (state) => state.localesLoaded,
	},
});
