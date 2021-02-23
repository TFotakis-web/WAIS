import { API, graphqlOperation } from 'aws-amplify';
import { getRequests, listRequestsByReceiverEmail, listRequestsBySenderEmail, listRequestss } from '@/graphql/queries';
import { sendRequest } from '@/graphql/mutations';

export const request = {
	namespaced: true,
	state: {
		requests: null,
	},
	mutations: {
		setRequests(state, payload) {
			state.requests = payload;
		}
	},
	actions: {
		getRequest(_, id) {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(getRequests, { id: id }))
					.then((response) => {
						resolve(response.data.getRequest);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequests({ commit }) {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestss))
					.then((response) => {
						commit('setRequests', response.data.listRequestss)
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequestsBySenderEmail({ commit, rootGetters }, senderEmail) {
			senderEmail = senderEmail || rootGetters['auth/email'];
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestsBySenderEmail, { senderEmail }))
					.then((response) => {
						commit('setRequests', response.data.listRequestsBySenderEmail)
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequestsByReceiverEmail({ commit }, receiverEmail) {
			receiverEmail = receiverEmail || '';
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestsByReceiverEmail, { receiverEmail }))
					.then((response) => {
						commit('setRequests', response.data.listRequestsBySenderEmail)
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		sendRequest(_, { requestType, payload }) {
			return new Promise((resolve, reject) => {
				payload = JSON.stringify(payload);
				API.graphql(graphqlOperation(sendRequest, { requestType, payload }))
					.then((response) => {
						resolve(response.data.sendRequest);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
	},
	getters: {
		requests: (state) => state.requests
	}
}
