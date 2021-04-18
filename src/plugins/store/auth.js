import router from '@/plugins/router/router';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { me, getUserProfileByUsername } from '@/graphql/custom-queries';
import { updateUserProfileDetails } from '@/graphql/custom-mutations';

const initState = () => ({
	cognitoUser: null,
	user: null,
	userProfile: null,
	userModelPermissions: [],
	userPagePermissions: {
		// 	'Home': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'VehiclePricing': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'IndustrialLiabilityPricing': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'FirePricing': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'LifePricing': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ContractsFile': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'UncollectedContracts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'CollectedContracts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ContractAdditionalActs': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'GreenCardContracts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'UnclaimedContracts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'InvalidContracts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'NewContract': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ProcessingDueDateRegister': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ProcessingDuePayment': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ProcessingPaid': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ProcessingLosses': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingReceipts': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingRegisters': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingTodaysIncome': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingCommissionsUncollected': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingCommissionsCollected': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'AccountingMutualAccount': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'SupplierContractors': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ContractorsExternalContractors': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'VehicleCards': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'VehicleCardsDetails': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'CustomerCards': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Library': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Office': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'UserProfile': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'PlatformData': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'DevTools': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'ContractApproval': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Payment': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Bank': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Collaboration': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Notifications': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'NotificationDetails': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'Wallet': {
		// 		read: true,
		// 		write: true,
		// 	},
		// 	'OfficeCreationForm': {
		// 		read: true,
		// 		write: true,
		// 	},
	},
});

export const auth = {
	namespaced: true,
	state: initState(),
	mutations: {
		init(state) {
			Object.assign(state, initState());
		},
		setCognitoUser(state, payload) {
			state.cognitoUser = payload;
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setUserProfile(state, payload) {
			state.userProfile = payload;
		},
	},
	actions: {
		async signUp(_, { username, password, email, phone_number }) {
			try {
				const params = {
					username,
					password,
					attributes: {
						email,
						phone_number,
					},
				};
				const response = await Auth.signUp(params);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async confirmSignUp(_, { username, code }) {
			try {
				const response = await Auth.confirmSignUp(username, code);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async resendSignUp(_, username) {
			try {
				const response = await Auth.resendSignUp(username);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async completeNewPassword({ dispatch }, { username, old_password, new_password }) {
			try {
				let response = await Auth.signIn({ username: username, password: old_password });
				response = await Auth.completeNewPassword(response, new_password);
				await dispatch('signIn', { username, password: new_password });
				return Promise.resolve(response);
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
					await dispatch('currentAuthenticatedUser');
					return Promise.resolve();
				}
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async signOut({ commit, dispatch }) {
			try {
				commit('pageStructure/increaseGlobalPendingPromises', null, { root: true });
				await Auth.signOut();
				commit('setUser', null);
				await router.push({ name: 'SignIn' });
				await dispatch('initModules', null, { root: true });
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async forgotPassword(_, username) {
			try {
				const response = await Auth.forgotPassword(username);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async forgotPasswordSubmit(_, { username, code, password }) {
			try {
				const response = await Auth.forgotPasswordSubmit(username, code, password);
				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async currentAuthenticatedUser({ commit, dispatch }) {
			try {
				commit('pageStructure/increaseGlobalPendingPromises', null, { root: true });

				// bypassCache: Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
				let response = await Auth.currentAuthenticatedUser({ bypassCache: true });
				commit('setCognitoUser', response);

				response = await Auth.currentUserInfo();
				commit('setUser', response);

				// User is now authenticated
				// Dispatch all async-able actions
				dispatch('request/listRequests', null, { root: true });

				// This has to be synchronous for routing permissions
				response = await API.graphql(graphqlOperation(me));
				const userProfile = response.data.me;

				commit('setUserProfile', userProfile);

				return Promise.resolve(response);
			} catch (error) {
				console.error(error);
				await Auth.signOut();
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseGlobalPendingPromises', null, { root: true });
			}
		},
		async updateUserProfile({ commit, getters }, userProfile) {
			if (!userProfile) {
				userProfile = {};
				const fields = [
					'id',
					'username',
					'email',
					'telephone',
					'name',
					'fathers_name',
					'address',
					'zip_code',
					'mobile',
					'tin',
					'family_name',
					'gender',
					'birthdate',
					'city',
					'profilePicture',
					'preferences',
					'locale',
					'files',
				];
				for (const key of fields) {
					const value = getters['userProfile'][key];
					if (value) {
						userProfile[key] = value;
					}
				}
			}

			try {
				commit('pageStructure/increaseRouterViewPendingPromises', null, { root: true });
				const response = await API.graphql(graphqlOperation(updateUserProfileDetails, { input: userProfile }));
				userProfile = response.data.updateUserProfileDetails;
				return Promise.resolve(userProfile);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseRouterViewPendingPromises', null, { root: true });
			}
		},
		async getUserProfileByUsername({ commit }, username) {
			commit('pageStructure/increaseRouterViewPendingPromises', null, { root: true });
			try {
				const response = await API.graphql(graphqlOperation(getUserProfileByUsername, { username }));
				return Promise.resolve(response.data.getUserProfileByUsername);
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('pageStructure/decreaseRouterViewPendingPromises', null, { root: true });
			}
		},
	},
	getters: {
		cognitoUser: (state) => state.cognitoUser,
		userGroups: (state) => state.cognitoUser?.signInUserSession.idToken.payload['cognito:groups'] || [],
		isAdmin: (state, getters) => getters.userGroups.includes('admin'),
		role: (state) => state.userProfile.role,
		user: (state) => state.user,
		userId: (state) => state.user.id,
		username: (state) => state.user.username,
		fullName: (state) => (state.userProfile.name || '') + ' ' + (state.userProfile.family_name || ''),
		email: (state) => state.user.attributes.email,
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		userModelPermissions: (state) => state.userModelPermissions,
		userPagePermissions: (state) => state.userPagePermissions,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
	},
};
