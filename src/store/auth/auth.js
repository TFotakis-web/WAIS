import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listUserProfileByUsername } from '@/graphql/custom-queries';
import { updateUserProfile } from '@/graphql/custom-mutations';
import router from '@/router';

export const auth = {
	namespaced: true,
	state: {
		cognitoUser: null,
		user: null,
		userProfile: null,
	},
	mutations: {
		setCognitoUser(state, payload) {
			state.cognitoUser = payload;
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setUserProfile(state, payload) {
			state.userProfile = payload;
		}
	},
	actions: {
		signUp(_, { username, password, email, phone_number }) {
			return new Promise((resolve, reject) => {
				let params = {
					username,
					password,
					attributes: {
						email,
						phone_number
					}
				};
				Auth.signUp(params)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		confirmSignUp(_, { username, code }) {
			return new Promise((resolve, reject) => {
				Auth.confirmSignUp(username, code)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		resendSignUp(_, username) {
			return new Promise((resolve, reject) => {
				Auth.resendSignUp(username)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		completeNewPassword({ dispatch }, { username, old_password, new_password }) {
			return new Promise((resolve, reject) => {
				Auth.signIn({ username: username, password: old_password })
					.then((response) => {
						Auth.completeNewPassword(response, new_password)
							.then(() => {
								dispatch("signIn", {
									username: username,
									password: new_password
								});
								resolve();
							});
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		signIn({ commit, dispatch }, { username, password }) {
			return new Promise((resolve, reject) => {
				Auth.signIn({ username, password })
					.then((response) => {
						let cognitoUser = response;
						commit("setCognitoUser", cognitoUser);
						if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
							reject({
								name: 'NEW_PASSWORD_REQUIRED',
								code: 'NEW_PASSWORD_REQUIRED'
							});
						} else {
							dispatch("currentUserInfo");
							resolve();
						}
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		signOut({ commit }) {
			return new Promise((resolve, reject) => {
				Auth.signOut()
					.then(() => {
						commit("setUser", null);
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		forgotPassword(_, username) {
			return new Promise((resolve, reject) => {
				Auth.forgotPassword(username)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		forgotPasswordSubmit(_, { username, code, password }) {
			return new Promise((resolve, reject) => {
				Auth.forgotPasswordSubmit(username, code, password)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					});
			});
		},
		currentAuthenticatedUser({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				commit('increaseGlobalPendingPromises', null, { root: true });
				Auth.currentAuthenticatedUser({
					bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
				})
					.then((response) => {
						commit("setCognitoUser", response);
						dispatch("currentUserInfo");
						resolve();
					})
					.catch((error) => {
						console.error(error);
						Auth.signOut()
							.then(() => {
								reject(error);
							});
					})
					.finally(() => {
						commit('decreaseGlobalPendingPromises', null, { root: true });
					});
			});
		},
		currentUserInfo({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				commit('increaseGlobalPendingPromises', null, { root: true });
				Auth.currentUserInfo()
					.then((response) => {
						let userInfo = response;
						if (userInfo) {
							commit("setUser", userInfo);
							dispatch("loadUserProfile");
						}
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					})
					.finally(() => {
						commit('decreaseGlobalPendingPromises', null, { root: true });
					});
			});
		},
		loadUserProfile({ commit, getters }) {
			return new Promise((resolve, reject) => {
				commit('increaseGlobalPendingPromises', null, { root: true });
				API.graphql(graphqlOperation(listUserProfileByUsername, { username: getters.username }))
					.then((response) => {
						let userProfile = response.data.listUserProfileByUsername.items[0];
						// Todo: Remove when backend is correct
						userProfile.permissions = {
							'Home': {
								read: true,
								write: true
							},
							'VehiclePricing': {
								read: true,
								write: true
							},
							'IndustrialLiabilityPricing': {
								read: true,
								write: true
							},
							'FirePricing': {
								read: true,
								write: true
							},
							'LifePricing': {
								read: true,
								write: true
							},
							'ContractsFile': {
								read: true,
								write: true
							},
							'UncollectedContracts': {
								read: true,
								write: true
							},
							'CollectedContracts': {
								read: true,
								write: true
							},
							'ContractAdditionalActs': {
								read: true,
								write: true
							},
							'GreenCardContracts': {
								read: true,
								write: true
							},
							'UnclaimedContracts': {
								read: true,
								write: true
							},
							'InvalidContracts': {
								read: true,
								write: true
							},
							'NewContract': {
								read: true,
								write: true
							},
							'ProcessingDueDateRegister': {
								read: true,
								write: true
							},
							'ProcessingDuePayment': {
								read: true,
								write: true
							},
							'ProcessingPaid': {
								read: true,
								write: true
							},
							'ProcessingLosses': {
								read: true,
								write: true
							},
							'AccountingReceipts': {
								read: true,
								write: true
							},
							'AccountingRegisters': {
								read: true,
								write: true
							},
							'AccountingTodaysIncome': {
								read: true,
								write: true
							},
							'AccountingCommissionsUncollected': {
								read: true,
								write: true
							},
							'AccountingCommissionsCollected': {
								read: true,
								write: true
							},
							'AccountingMutualAccount': {
								read: true,
								write: true
							},
							'SupplierContractors': {
								read: true,
								write: true
							},
							'ContractorsExternalContractors': {
								read: true,
								write: true
							},
							'VehicleCards': {
								read: true,
								write: true
							},
							'VehicleCardsDetails': {
								read: true,
								write: true
							},
							'CustomerCards': {
								read: true,
								write: true
							},
							'Library': {
								read: true,
								write: true
							},
							'Trade': {
								read: true,
								write: true
							},
							'UserProfile': {
								read: true,
								write: true
							},
							'PlatformData': {
								read: true,
								write: true
							},
							'DevTools': {
								read: true,
								write: true
							},
							'ContractApproval': {
								read: true,
								write: true
							},
							'Payment': {
								read: true,
								write: true
							},
							'Bank': {
								read: true,
								write: true
							},
							'Collaboration': {
								read: true,
								write: true
							},
							'Notifications': {
								read: true,
								write: true
							},
							'Wallet': {
								read: true,
								write: true
							},
						};
						commit("setUserProfile", userProfile);
						router.$loadRoutesAsync();
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					})
					.finally(() => {
						commit('decreaseGlobalPendingPromises', null, { root: true });
					});
			});
		},
		updateUserProfile({ commit }, userProfile) {
			return new Promise((resolve, reject) => {
				commit('increaseRouterViewPendingPromises', null, { root: true });
				API.graphql(graphqlOperation(updateUserProfile, { input: userProfile }))
					.then((response) => {
						userProfile = response.data.updateUserProfile;
						commit("setUserProfile", userProfile);
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject(error);
					})
					.finally(() => {
						commit('decreaseRouterViewPendingPromises', null, { root: true });
					});
			});
		},
	},
	getters: {
		cognitoUser: (state) => state.cognitoUser,
		user: (state) => state.user,
		userId: (state) => state.user.id,
		username: (state) => state.user.username,
		email: (state) => state.user.attributes.email,
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		permissions: (state) => state.userProfile.permissions,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
	}
}
