import { API, graphqlOperation } from 'aws-amplify';
import { getRequests } from '@/graphql/queries';
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
		async sendRequest(_, { requestType, payload }) {
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
