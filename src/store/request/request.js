import { API, graphqlOperation } from 'aws-amplify';
import { getRequests, sendRequest } from '@/graphql/queries';

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
		async getRequest(_, id) {
			try {
				const response = await API.graphql(graphqlOperation(getRequests, { id: id }));
				return Promise.resolve(response.data.getRequest);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async sendRequest(_, { requestType, payload }) {
			try {
				const response = await API.graphql(graphqlOperation(sendRequest, { requestType, payload }));
				return Promise.resolve(response.data.getRequest);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
	},
	getters: {
		requests: (state) => state.requests
	}
}
