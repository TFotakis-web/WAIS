import { API, graphqlOperation } from 'aws-amplify';
import { getRequestsSimple, listRequestsByReceiverEmailSimple, listRequestsBySenderEmailSimple, listRequestssSimple } from '@/graphql/custom-queries';
import { sendRequest } from '@/graphql/custom-mutations';
import { updateRequests } from '@/graphql/custom-mutations';
// import { updateFields } from '@/graphql/custom-mutations';

export const request = {
	namespaced: true,
	state: {
		requests: [],
	},
	mutations: {
		setRequests(state, payload) {
			state.requests = payload;
		},
		pushRequest(state, payload) {
			state.requests.push(payload);
		}
	},
	actions: {
		getRequest(_, id) {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(getRequestsSimple, { id: id }))
					.then((response) => {
						resolve(response.data.getRequests);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequests({ commit }) {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestssSimple))
					.then((response) => {
						commit('setRequests', response.data.listRequestss.items)
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
				API.graphql(graphqlOperation(listRequestsBySenderEmailSimple, { senderEmail }))
					.then((response) => {
						commit('setRequests', response.data.listRequestsBySenderEmail.items)
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
				API.graphql(graphqlOperation(listRequestsByReceiverEmailSimple, { receiverEmail }))
					.then((response) => {
						commit('setRequests', response.data.listRequestsByReceiverEmail.items)
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
						response = JSON.parse(response.data.sendRequest);
						resolve(response);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		updateRequest(_, { request }) {
			delete request.createdAt;
			delete request.updatedAt;
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(updateRequests, { input: request }))
				// Todo: Check if ok to use that
				// API.graphql(graphqlOperation(updateFields, { typename: 'Requests', id: request.id, fields: request }))
					.then((response) => {
						resolve(response.data.updateFields);
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
