import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserProfileByUsername } from '@/graphql/queries';
import { updateUserProfile } from '@/graphql/mutations';

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
		async signUp(_, { username, password, email, phone_number }) {
			try {
				await Auth.signUp({
					username,
					password,
					attributes: {
						email,
						phone_number
					}
				});
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async confirmSignUp(_, { username, code }) {
			try {
				await Auth.confirmSignUp(username, code);
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async resendSignUp(_, username) {
			try {
				await Auth.resendSignUp(username);
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async completeNewPassword({ dispatch }, { username, old_password, new_password }) {
			try {
				const cognitoUser = await Auth.signIn({
					username: username,
					password: old_password
				});
				await Auth.completeNewPassword(cognitoUser, new_password);
				dispatch("signIn", {
					username: username,
					password: new_password
				});
				return Promise.resolve("Success");
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async signIn({ commit, dispatch }, { username, password }) {
			let cognitoUser;
			try {
				cognitoUser = await Auth.signIn({
					username,
					password
				});
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
			commit("setCognitoUser", cognitoUser);
			if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
				return Promise.reject({
					name: 'NEW_PASSWORD_REQUIRED',
					code: 'NEW_PASSWORD_REQUIRED'
				});
			}
			await dispatch("currentUserInfo");
			return Promise.resolve("Success");
		},
		async signOut({ commit }) {
			try {
				await Auth.signOut();
				commit("setUser", null);
				return Promise.resolve("Success");
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async forgotPassword(_, username) {
			try {
				await Auth.forgotPassword(username);
				return Promise.resolve("Success");
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async forgotPasswordSubmit(_, { username, code, password }) {
			try {
				await Auth.forgotPasswordSubmit(username, code, password);
				return Promise.resolve("Success");
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async currentAuthenticatedUser({ commit, dispatch }) {
			commit('increaseGlobalPendingPromises', null, { root: true });
			let cognitoUser;
			try {
				cognitoUser = await Auth.currentAuthenticatedUser({
					bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
				}).catch(async error => {
					console.log(error);
					await Auth.signOut();
				});
			} catch (error) {
				await Auth.signOut();
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
			commit("setCognitoUser", cognitoUser);
			await dispatch("currentUserInfo");

			return Promise.resolve();
		},
		async currentUserInfo({ commit, dispatch }) {
			commit('increaseGlobalPendingPromises', null, { root: true });
			let userInfo;
			try {
				userInfo = await Auth.currentUserInfo();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
			if (userInfo) {
				commit("setUser", userInfo);
				await dispatch("loadUserProfile");
			}
			return Promise.resolve();
		},
		async loadUserProfile({ commit, getters }) {
			commit('increaseGlobalPendingPromises', null, { root: true });
			let userProfile;
			try {
				userProfile = await API.graphql(graphqlOperation(listUserProfileByUsername, { username: getters.username }));
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseGlobalPendingPromises', null, { root: true });
			}
			userProfile = userProfile.data.listUserProfileByUsername.items[0];
			commit("setUserProfile", userProfile);
			return Promise.resolve();
		},
		async updateUserProfile({ commit }, userProfile) {
			commit('increaseRouterViewPendingPromises', null, { root: true });
			let response;
			try {
				response = await API.graphql(graphqlOperation(updateUserProfile, { input: userProfile }));
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			} finally {
				commit('decreaseRouterViewPendingPromises', null, { root: true });
			}
			userProfile = response.data.updateUserProfile;
			commit("setUserProfile", userProfile);
			return Promise.resolve();
		},
	},
	getters: {
		cognitoUser: (state) => state.cognitoUser,
		user: (state) => state.user,
		userId: (state) => state.user.id,
		username: (state) => state.user.username,
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
	}
}
