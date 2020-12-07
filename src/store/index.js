import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from '@/store/auth/auth'
import {vehicle} from '@/store/vehicle/vehicle'


Vue.use(Vuex);
export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		vehicle
	}
});
