import { API, graphqlOperation } from 'aws-amplify';
import { createOffice as createOfficeMutation } from '@/graphql/custom-mutations';
import { getOffice as getOfficeQuery } from '@/graphql/custom-queries';
import { listOffices as listOfficesQuery } from '@/graphql/custom-queries';
import { v4 as uuid } from 'uuid';

export const office = {
	namespaced: true,
	state: {
		offices: null,
	},
	mutations: {
		setOffices(state, payload) {
			state.offices = payload;
		},
	},
	actions: {
		async createOffice({ dispatch }, newOffice) {
			try {
				newOffice.id = uuid();
				await API.graphql(graphqlOperation(createOfficeMutation, { input: newOffice }));
				dispatch('getOfficesData');
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getOffice(_, id) {
			const office = await API.graphql(graphqlOperation(getOfficeQuery, { id: id }));
			return office.data.getOffice;
		},
		async updateOffice(_, id) {
			const office = await API.graphql(graphqlOperation(getOfficeQuery, { id: id }));
			return office.data.getOffice;
		},
		async getOfficesData({ commit }) {
			const officesData = await API.graphql(graphqlOperation(listOfficesQuery));
			commit('setOffices', officesData.data.listOffices.items);
		},
	},
	getters: {
		offices: (state) => state.offices,
	},
};
