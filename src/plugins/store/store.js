import { createStore } from 'vuex';
import { pageStructure } from '@/plugins/store/pageStructure';
import { auth } from '@/plugins/store/auth';
import { request } from '@/plugins/store/request';
import { office } from '@/plugins/store/office';
import { platformData } from '@/plugins/store/platformData';
// import { vehicle } from '@/plugins/store/vehicle';

import { API, graphqlOperation } from 'aws-amplify';
import { echo, me } from '@/graphql/custom-queries';

const initState = () => ({});

export const store = createStore({
	modules: {
		pageStructure,
		auth,
		request,
		office,
		platformData,
		// vehicle,
	},
	state: initState(),
	mutations: {
		init(state) {
			Object.assign(state, initState());
		},
	},
	actions: {
		initModules({ commit }) {
			commit('init');
			commit('auth/init');
			commit('pageStructure/init');
			commit('request/init');
		},
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
	getters: {},
});


