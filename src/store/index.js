import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/auth/auth';
import { vehicle } from '@/store/vehicle/vehicle';
import { trade } from '@/store/trade/trade';
import { platformData } from '@/store/platformData/platformData';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		auth,
		vehicle,
		trade,
		platformData
	},
	state: {
		globalPendingPromises: 0,
		localesLoaded: false,
		routerViewPendingPromises: 0
	},
	mutations: {
		increaseGlobalPendingPromises(state) {
			state.globalPendingPromises++;
		},
		decreaseGlobalPendingPromises(state) {
			state.globalPendingPromises--;
			if (state.globalPendingPromises < 0) {
				console.error("Pending Promises:", state.globalPendingPromises);
			}
		},
		increaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises++;
		},
		decreaseRouterViewPendingPromises(state) {
			state.routerViewPendingPromises--;
			if (state.routerViewPendingPromises < 0) {
				console.error("Pending Promises:", state.routerViewPendingPromises);
			}
		},
		setLocalesLoaded(state, loaded) {
			state.localesLoaded = loaded;
		}
	},
	actions: {},
	getters: {
		globalPendingPromises: (state) => state.globalPendingPromises,
		routerViewPendingPromises: (state) => state.routerViewPendingPromises,
		localesLoaded: (state) => state.localesLoaded
	}
});
