import Vue from 'vue';
import Vuex from 'vuex';
import {auth} from '@/store/auth/auth'
import {vehicle} from '@/store/vehicle/vehicle'
import {trade} from '@/store/trade/trade'


Vue.use(Vuex);
export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		vehicle,
		trade
	}
});
