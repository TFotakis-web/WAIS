import { Auth } from 'aws-amplify';

export const auth = {
	namespaced: true,
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
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
		async signIn({ commit }, { username, password }) {
			try {
				await Auth.signIn({
					username,
					password
				});

				const userInfo = await Auth.currentUserInfo();
				commit("setUser", userInfo);
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
				const userInfo = await Auth.currentUserInfo();
				commit("setUser", userInfo);
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		}
	},
	getters: {
		user: (state) => state.user
	}
}
