import { API, graphqlOperation } from 'aws-amplify';
import { getMySentRequests, getRequestsForMe } from '@/graphql/custom-queries';
import { createInviteContractorToOfficeRequest, createInviteEmployeeToOfficeRequest, createOfficeConnectionRequest, createOfficeRequest, deleteRequestsSentByMe, resolveRequest } from '@/graphql/custom-mutations';

const initState = () => ({
	requestsForMe: {},
	requestsSentByMe: {},
});

export const request = {
	namespaced: true,
	state: initState(),
	mutations: {
		init(state) {
			Object.assign(state, initState());
		},
		setRequestsForMe(state, payload) {
			state.requestsForMe = payload;
		},
		setRequestsSentByMe(state, payload) {
			state.requestsSentByMe = payload;
		},
		pushRequestsSentByMe(state, payload) {
			if (state.requestsSentByMe.items === undefined) {
				state.requestsSentByMe.items = [];
			}
			state.requestsSentByMe.items.push(payload);
		},
		pushRequestsForMe(state, payload) {
			if (state.requestsForMe.items === undefined) {
				state.requestsForMe.items = [];
			}
			state.requestsForMe.items.push(payload);
		},
		concatRequestsSentByMe(state, payload) {
			if (state.requestsSentByMe.items === undefined) {
				state.requestsSentByMe.items = [];
			}
			state.requestsSentByMe.items = state.requestsSentByMe.items.concat(payload);
		},
		concatRequestsForMe(state, payload) {
			if (state.requestsForMe.items === undefined) {
				state.requestsForMe.items = [];
			}
			state.requestsForMe.items = state.requestsForMe.items.concat(payload);
		},
		removeRequestSentByMe(state, id) {
			state.requestsSentByMe.items = state.requestsSentByMe.items.filter(r => r.id !== id);
		},
		removeRequestForMe(state, id) {
			state.requestsForMe.items = state.requestsForMe.items.filter(r => r.id !== id);
		},
	},
	actions: {
		async getMySentRequests({ commit }) {
			try {
				commit('pageStructure/increaseGlobalPendingPromises', null, { root: true });
				const response = await API.graphql(graphqlOperation(getMySentRequests));
				commit('setRequestsSentByMe', response.data.getMySentRequests);
				return Promise.resolve(response.data.getMySentRequests.items);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		async getRequestsForMe({ commit }) {
			try {
				commit('pageStructure/increaseGlobalPendingPromises', null, { root: true });
				const response = await API.graphql(graphqlOperation(getRequestsForMe));
				commit('setRequestsForMe', response.data.getRequestsForMe);
				return Promise.resolve(response.data.getRequestsForMe.items);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		listRequests({ dispatch }) {
			dispatch('getMySentRequests');
			dispatch('getRequestsForMe');
		},
		async createInviteContractorToOfficeRequest({ commit }, payload) {
			try {
				let response = await API.graphql(graphqlOperation(createInviteContractorToOfficeRequest, { input: payload }));
				response = response.data.createInviteContractorToOfficeRequest;
				commit('pushRequestsSentByMe', response)
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createInviteEmployeeToOfficeRequest({ commit }, payload) {
			try {
				let response = await API.graphql(graphqlOperation(createInviteEmployeeToOfficeRequest, { input: payload }));
				response = response.data.createInviteEmployeeToOfficeRequest;
				commit('pushRequestsSentByMe', response)
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createOfficeConnectionRequest({ commit }, payload) {
			try {
				let response = await API.graphql(graphqlOperation(createOfficeConnectionRequest, { input: payload }));
				response = response.data.createOfficeConnectionRequest;
				commit('pushRequestsSentByMe', response)
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createOfficeRequest({ commit }, payload) {
			try {
				let response = await API.graphql(graphqlOperation(createOfficeRequest, { input: payload }));
				response = response.data.createOfficeRequest;
				commit('pushRequestsSentByMe', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateRequest({ dispatch }, request) {
			try {
				let response = await API.graphql(graphqlOperation(deleteRequestsSentByMe, { input: { id: request.id } }));

				switch (request.type) {
					case 'CREATE_OFFICE':
						response = await dispatch('createOfficeRequest', request.payload);
						break;
					case 'CREATE_OFFICE_CONNECTION':
						response = await dispatch('createOfficeConnectionRequest', request.payload);
						break;
					case 'INVITE_EMPLOYEE_TO_OFFICE':
						response = await dispatch('createInviteEmployeeToOfficeRequest', request.payload);
						break;
					case 'INVITE_CONTRACTOR_TO_OFFICE':
						response = await dispatch('createInviteContractorToOfficeRequest', request.payload);
						break;
				}

				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async resolveRequest({ commit }, { id, payload }) {
			try {
				payload = JSON.stringify(payload);
				const response = await API.graphql(graphqlOperation(resolveRequest, { id, payload }));
				commit('removeRequestForMe', id);
				return Promise.resolve(JSON.parse(response.data.resolveRequest));
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
	},
	getters: {
		requestsSentByMe: (state) => state.requestsSentByMe?.items || [],
		requestsForMe: (state) => state.requestsForMe?.items || [],
	},
};
