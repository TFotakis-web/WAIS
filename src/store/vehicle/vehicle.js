import { API, graphqlOperation } from 'aws-amplify';
import { createVehicle as createVehicleMutation } from '@/graphql/mutations';
import { getVehicle as getVehicleQuery } from '@/graphql/queries';
import { listVehicles as listVehiclesQuery } from '@/graphql/queries';
import { v4 as uuid } from 'uuid';

export const vehicle = {
	namespaced: true,
	state: {
		vehicles: null,
	},
	mutations: {
		setVehicles(state, payload) {
			state.vehicles = payload;
		}
	},
	actions: {
		async createVehicle({ dispatch }, newVehicle) {
			try {
				newVehicle.id = uuid();
				await API.graphql(graphqlOperation(createVehicleMutation, { input: newVehicle }));
				dispatch("getVehiclesData");
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getVehicle(_, id) {
			const vehicle = await API.graphql(graphqlOperation(getVehicleQuery, { id: id }));
			return vehicle.data.getVehicle;
		},
		async getVehiclesData({ commit }) {
			const vehiclesData = await API.graphql(graphqlOperation(listVehiclesQuery));
			commit("setVehicles", vehiclesData.data.listVehicles.items);
		},
	},
	getters: {
		vehicles: (state) => state.vehicles
	}
}
