import { API, Auth, graphqlOperation } from 'aws-amplify';
// import { listUserProfileByUsername } from '@/graphql/custom-queries';
import { me } from '@/graphql/custom-queries';
import { updateUserProfile } from '@/graphql/custom-mutations';
import router from '@/plugins/router/router';

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
		},
		pushRequestsSentByMe(state, payload) {
			if (state.userProfile.requestsSentByMe.items === undefined) {
				state.userProfile.requestsSentByMe.items = [];
			}
			state.userProfile.requestsSentByMe.items.push(payload);
		},
		pushRequestsForMe(state, payload) {
			if (state.userProfile.requestsForMe.items === undefined) {
				state.userProfile.requestsForMe.items = [];
			}
			state.userProfile.requestsForMe.items.push(payload);
		},
		concatRequestsSentByMe(state, payload) {
			if (state.userProfile.requestsSentByMe.items === undefined) {
				state.userProfile.requestsSentByMe.items = [];
			}
			state.userProfile.requestsSentByMe.items = state.userProfile.requestsSentByMe.items.concat(payload);
		},
		concatRequestsForMe(state, payload) {
			if (state.userProfile.requestsForMe.items === undefined) {
				state.userProfile.requestsForMe.items = [];
			}
			state.userProfile.requestsForMe.items = state.userProfile.requestsForMe.items.concat(payload);
		},
		removeRequestSentByMe(state, request) {
			state.userProfile.requestsSentByMe.items = state.userProfile.requestsSentByMe.items.filter(r => r.id !== request.id);
		},
		removeRequestForMe(state, request) {
			state.userProfile.requestsForMe.items = state.userProfile.requestsForMe.items.filter(r => r.id !== request.id);
		},
	},
	actions: {
		signUp(_, { username, password, email, phone_number }) {
			return new Promise((resolve, reject) => {
				const params = {
					username,
					password,
					attributes: {
						email,
						phone_number,
					},
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
		async completeNewPassword({ dispatch }, { username, old_password, new_password }) {
			try {
				const response = await Auth.signIn({ username: username, password: old_password });
				await Auth.completeNewPassword(response, new_password);
				await dispatch('signIn', {
					username: username,
					password: new_password,
				});
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async signIn({ commit, dispatch }, { username, password }) {
			try {
				const cognitoUser = await Auth.signIn({ username, password });
				commit('setCognitoUser', cognitoUser);
				if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
					return Promise.reject({
						name: 'NEW_PASSWORD_REQUIRED',
						code: 'NEW_PASSWORD_REQUIRED',
					});
				} else {
					await dispatch('currentUserInfo');
					return Promise.resolve();
				}
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		signOut({ commit }) {
			return new Promise((resolve, reject) => {
				Auth.signOut()
					.then(() => {
						router.go(0); // Reload page
						commit('setUser', null);
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
		async currentAuthenticatedUser({ commit, dispatch }) {
			try {
				commit('increaseGlobalPendingPromises', null, { root: true });
				const response = await Auth.currentAuthenticatedUser({
					bypassCache: true,  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
				});
				commit('setCognitoUser', response);
				await dispatch('currentUserInfo');
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				await Auth.signOut();
				// router.go(0); // Reload page
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		async currentUserInfo({ commit, dispatch }) {
			try {
				commit('increaseGlobalPendingPromises', null, { root: true });
				const userInfo = await Auth.currentUserInfo();
				if (userInfo) {
					commit('setUser', userInfo);
					await dispatch('loadUserProfile');
				}
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		async loadUserProfile({ commit, dispatch, getters }) {
			try {
				commit('increaseGlobalPendingPromises', null, { root: true });
				let response = await API.graphql(graphqlOperation(me));
				const userProfile = response.data.me;
				// let userProfile = response.data.listUserProfileByUsername.items[0];
				// Todo: Remove when backend is correct
				userProfile.permissions = {
					'Home': {
						read: true,
						write: true,
					},
					'VehiclePricing': {
						read: true,
						write: true,
					},
					'IndustrialLiabilityPricing': {
						read: true,
						write: true,
					},
					'FirePricing': {
						read: true,
						write: true,
					},
					'LifePricing': {
						read: true,
						write: true,
					},
					'ContractsFile': {
						read: true,
						write: true,
					},
					'UncollectedContracts': {
						read: true,
						write: true,
					},
					'CollectedContracts': {
						read: true,
						write: true,
					},
					'ContractAdditionalActs': {
						read: true,
						write: true,
					},
					'GreenCardContracts': {
						read: true,
						write: true,
					},
					'UnclaimedContracts': {
						read: true,
						write: true,
					},
					'InvalidContracts': {
						read: true,
						write: true,
					},
					'NewContract': {
						read: true,
						write: true,
					},
					'ProcessingDueDateRegister': {
						read: true,
						write: true,
					},
					'ProcessingDuePayment': {
						read: true,
						write: true,
					},
					'ProcessingPaid': {
						read: true,
						write: true,
					},
					'ProcessingLosses': {
						read: true,
						write: true,
					},
					'AccountingReceipts': {
						read: true,
						write: true,
					},
					'AccountingRegisters': {
						read: true,
						write: true,
					},
					'AccountingTodaysIncome': {
						read: true,
						write: true,
					},
					'AccountingCommissionsUncollected': {
						read: true,
						write: true,
					},
					'AccountingCommissionsCollected': {
						read: true,
						write: true,
					},
					'AccountingMutualAccount': {
						read: true,
						write: true,
					},
					'SupplierContractors': {
						read: true,
						write: true,
					},
					'ContractorsExternalContractors': {
						read: true,
						write: true,
					},
					'VehicleCards': {
						read: true,
						write: true,
					},
					'VehicleCardsDetails': {
						read: true,
						write: true,
					},
					'CustomerCards': {
						read: true,
						write: true,
					},
					'Library': {
						read: true,
						write: true,
					},
					'Trade': {
						read: true,
						write: true,
					},
					'UserProfile': {
						read: true,
						write: true,
					},
					'PlatformData': {
						read: true,
						write: true,
					},
					'DevTools': {
						read: true,
						write: true,
					},
					'ContractApproval': {
						read: true,
						write: true,
					},
					'Payment': {
						read: true,
						write: true,
					},
					'Bank': {
						read: true,
						write: true,
					},
					'Collaboration': {
						read: true,
						write: true,
					},
					'Notifications': {
						read: true,
						write: true,
					},
					'Wallet': {
						read: true,
						write: true,
					},
					'TradeCreationForm': {
						read: true,
						write: true,
					},
				};
				commit('setUserProfile', userProfile);

				if (getters.isAdmin) {
					response = await dispatch('request/listRequestsByReceiverEmail', 'wais@admin.com', { root: true });
					for (const request of response) {
						request.payload = JSON.parse(request.payload);
					}
					commit('concatRequestsForMe', response);
				}
				// router.$loadRoutesAsync();
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		updateUserProfile({ commit }, userProfile) {
			return new Promise((resolve, reject) => {
				commit('increaseRouterViewPendingPromises', null, { root: true });
				API.graphql(graphqlOperation(updateUserProfile, { input: userProfile }))
					.then((response) => {
						userProfile = response.data.updateUserProfile;
						// commit("setUserProfile", userProfile);
						resolve(userProfile);
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
		userGroups: (state) => state.cognitoUser.signInUserSession.idToken.payload['cognito:groups'] || [],
		isAdmin: (state, getters) => getters.userGroups.includes('admin'),
		user: (state) => state.user,
		userId: (state) => state.user.id,
		username: (state) => state.user.username,
		fullName: (state) => state.userProfile.name + ' ' + state.userProfile.family_name,
		email: (state) => state.user.attributes.email,
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		permissions: (state) => state.userProfile.permissions,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
		requestsSentByMe: (state) => state.userProfile.requestsSentByMe.items || [],
		requestsForMe: (state) => state.userProfile.requestsForMe.items || [],
	},
};
