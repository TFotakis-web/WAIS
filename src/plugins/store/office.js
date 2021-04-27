import { API, graphqlOperation } from 'aws-amplify';
import {
	createContractForOffice,
	createCustomerForOffice,
	createOfficeAccessConnectionForOffice,
	createVehicleForOffice,
	deleteContractForOffice,
	deleteContractorForOffice,
	deleteCustomerForOffice,
	deleteEmployeeForOffice,
	deleteOfficeAccessConnectionForOffice,
	deleteVehicleForOffice,
	updateContractForOffice,
	updateContractorModelPermissionsForOffice,
	updateContractorPagePermissionsForOffice,
	updateCustomerForOffice,
	updateEmployeeModelPermissionsForOffice,
	updateEmployeePagePermissionsForOffice,
	updateOfficeAccessConnectionForOffice,
	updateOfficeDetails,
	updateVehicleForOffice,
} from '@/graphql/custom-mutations';
import {
	getContractorUserProfiles,
	getContractsForOfficeId,
	getCustomersForOfficeId, getEmployeeUserProfiles,
	// getWorkEnvironment,
	getWorkEnvironment,
	getPartnerOfficeConnectionsForOfficeId,
} from '@/graphql/custom-queries';

export const office = {
	namespaced: true,
	state: {
		office: {},
		employees: {},
		contractors: {},
		contracts: {},
		customers: {},
		partnerOffices: {},
	},
	mutations: {
		setOffice(state, payload) {
			state.office = payload;
		},
		setEmployees(state, payload) {
			state.eployees = payload;
		},
		setContractors(state, payload) {
			state.contractors = payload;
		},
		setContracts(state, payload) {
			state.contracts = payload;
		},
		setCustomers(state, payload) {
			state.customers = payload;
		},
		setPartnerOffices(state, payload) {
			state.partnerOffices = payload;
		},
	},
	actions: {
		async getContractsForOfficeId({ commit }, officeId) {
			try {
				let response = await API.graphql(graphqlOperation(getContractsForOfficeId, { officeId }));
				response = response.data.getContractsForOfficeId;
				commit('setContracts', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getCustomersForOfficeId({ commit }, officeId) {
			try {
				let response = await API.graphql(graphqlOperation(getCustomersForOfficeId, { officeId }));
				response = response.data.getCustomersForOfficeId;
				commit('setCustomers', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getWorkEnvironment({ commit }) {
			try {
				commit('pageStructure/increaseGlobalPendingPromises', null, { root: true });
				let response = await API.graphql(graphqlOperation(getWorkEnvironment));
				response = response.data.getWorkEnvironment.items;
				if (Object.keys(response).length) {
					response.office.bankAccountInfo = JSON.parse(JSON.parse(response.office.bankAccountInfo));
					commit('setOffice', response.office);
					commit('auth/setModelPermissions', response.modelPermissions, { root: true });
					commit('auth/setPagePermissions', JSON.parse(response.pagePermissions), { root: true });
				}
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		async getEmployeeUserProfiles({ commit }) {
			try {
				commit('pageStructure/increaseRouterViewPendingPromises', null, { root: true });
				let response = await API.graphql(graphqlOperation(getEmployeeUserProfiles));
				response = response.data.getEmployeeUserProfiles;
				commit('setEmployees', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseRouterViewPendingPromises', null, { root: true });
			}
		},
		async getContractorUserProfiles({ commit }) {
			try {
				commit('pageStructure/increaseRouterViewPendingPromises', null, { root: true });
				let response = await API.graphql(graphqlOperation(getContractorUserProfiles));
				response = response.data.getContractorUserProfiles;
				commit('setContractors', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseRouterViewPendingPromises', null, { root: true });
			}
		},
		async getPartnerOfficeConnectionsForOfficeId({ commit }, officeId) {
			try {
				commit('pageStructure/increaseRouterViewPendingPromises', null, { root: true });
				let response = await API.graphql(graphqlOperation(getPartnerOfficeConnectionsForOfficeId, { officeId }));
				response = response.data.getPartnerOfficeConnectionsForOfficeId;
				commit('setPartnerOffices', response);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseRouterViewPendingPromises', null, { root: true });
			}
		},
		async createContractForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(createContractForOffice));
				response = response.data.createContractForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createCustomerForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(createCustomerForOffice));
				response = response.data.createCustomerForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createOfficeAccessConnectionForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(createOfficeAccessConnectionForOffice));
				response = response.data.createOfficeAccessConnectionForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async createVehicleForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(createVehicleForOffice));
				response = response.data.createVehicleForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteContractForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteContractForOffice));
				response = response.data.deleteContractForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteContractorForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteContractorForOffice));
				response = response.data.deleteContractorForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteCustomerForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteCustomerForOffice));
				response = response.data.deleteCustomerForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteEmployeeForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteEmployeeForOffice));
				response = response.data.deleteEmployeeForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteOfficeAccessConnectionForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteOfficeAccessConnectionForOffice));
				response = response.data.deleteOfficeAccessConnectionForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async deleteVehicleForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(deleteVehicleForOffice));
				response = response.data.deleteVehicleForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateContractForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateContractForOffice));
				response = response.data.updateContractForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateContractorModelPermissionsForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateContractorModelPermissionsForOffice));
				response = response.data.updateContractorModelPermissionsForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateContractorPagePermissionsForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateContractorPagePermissionsForOffice));
				response = response.data.updateContractorPagePermissionsForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateCustomerForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateCustomerForOffice));
				response = response.data.updateCustomerForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateEmployeeModelPermissionsForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateEmployeeModelPermissionsForOffice));
				response = response.data.updateEmployeeModelPermissionsForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateEmployeePagePermissionsForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateEmployeePagePermissionsForOffice));
				response = response.data.updateEmployeePagePermissionsForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateOfficeAccessConnectionForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateOfficeAccessConnectionForOffice));
				response = response.data.updateOfficeAccessConnectionForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateOfficeDetails({ getters }) {
			const keys = [
				'id',
				'officeName',
				'office_logo',
				'address',
				'office_email',
				'zip_code',
				'mobile',
				'phone',
				'tin',
				'professionStartDate',
				'chamberRecordNumber',
				'insuranceLicenseExpirationDate',
				'civilLiabilityExpirationDate',
				'bankAccountInfo',
				'files',
				'insuranceCompanies',
			];

			const payload = {};
			for (const k of keys) {
				payload[k] = getters.myOffice[k];
			}

			payload.bankAccountInfo = JSON.stringify(payload.bankAccountInfo);

			try {
				let response = await API.graphql(graphqlOperation(updateOfficeDetails, { input: payload }));
				response = response.data.updateOfficeDetails;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async updateVehicleForOffice() {
			try {
				let response = await API.graphql(graphqlOperation(updateVehicleForOffice));
				response = response.data.updateVehicleForOffice;
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
	},
	getters: {
		myOffice: (state) => state.office || {},
		employees: (state) => state.employees?.items || [],
		contractors: (state) => state.contractors?.items || [],
		partnerOffices: (state) => state.partnerOffices?.items || [],
	},
};
