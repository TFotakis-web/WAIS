import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserProfile } from '@/graphql/queries';

export const auth = {
	namespaced: true,
	state: {
		user: null,
		userProfile: null,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setUserProfile(state, payload) {
			state.userProfile = payload;
		}
	},
	actions: {
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
		async signIn({ dispatch }, { username, password }) {
			try {
				await Auth.signIn({
					username,
					password
				});

				await dispatch("currentUserInfo");
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
		async currentUserInfo({ commit }) {
			try {
				commit('increaseGlobalPendingPromises', null, { root: true });
				const userInfo = await Auth.currentUserInfo();
				if (userInfo) {
					commit("setUser", userInfo);

					const userProfile = await API.graphql(graphqlOperation(getUserProfile, { id: userInfo.id }));
					commit("setUserProfile", userProfile);
				}
				commit('decreaseGlobalPendingPromises', null, { root: true });
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		}
	},
	getters: {
		user: (state) => state.user,
		userId: (state) => state.user.id,
		username: (state) => state.user.username,
		userAttributes: (state) => state.user.attributes,
		userProfile: (state) => state.userProfile,
		userPreferences: (state) => JSON.parse(state.userProfile.preferences),
	}
}
