import { API, Auth, graphqlOperation } from 'aws-amplify';
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
						commit("setUserProfile", userProfile);
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
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
	}
}
