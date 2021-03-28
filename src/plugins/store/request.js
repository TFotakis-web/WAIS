import { API, graphqlOperation } from 'aws-amplify';
import { getRequests, listRequestsByReceiverEmail, listRequestsBySenderEmail, listRequestss } from '@/graphql/custom-queries';
import { resolveRequest, sendRequest } from '@/graphql/custom-mutations';
import { updateRequests } from '@/graphql/custom-mutations';
// import { updateFields } from '@/graphql/custom-mutations';

const initState = () => ({});

export const request = {
	namespaced: true,
	state: initState(),
	mutations: {
		init(state) {
			Object.assign(state, initState());
		},
	},
	actions: {
		getRequest(_, id) {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(getRequests, { id: id }))
					.then((response) => {
						resolve(response.data.getRequests);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequests() {
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestss))
					.then((response) => {
						resolve(response.data.listRequestss.items);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequestsBySenderEmail({ rootGetters }, senderEmail) {
			senderEmail = senderEmail || rootGetters['auth/email'];
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestsBySenderEmail, { senderEmail }))
					.then((response) => {
						resolve(response.data.listRequestsBySenderEmail.items);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		listRequestsByReceiverEmail(_, receiverEmail) {
			receiverEmail = receiverEmail || '';
			return new Promise((resolve, reject) => {
				API.graphql(graphqlOperation(listRequestsByReceiverEmail, { receiverEmail }))
					.then((response) => {
						resolve(response.data.listRequestsByReceiverEmail.items);
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
					// API.graphql(graphqlOperation(updateFields, { typename: 'Requests', id: request.id, fields: JSON.stringify(request) }))
					.then((response) => {
						resolve(response.data.updateFields);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		resolveRequest(_, { id, payload }) {
			return new Promise((resolve, reject) => {
				payload = JSON.stringify(payload);
				API.graphql(graphqlOperation(resolveRequest, { id, payload }))
					.then((response) => {
						response = JSON.parse(response.data.resolveRequest);
						resolve(response);
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
	},
	getters: {
		requests: (state) => state.requests,
	},
};
