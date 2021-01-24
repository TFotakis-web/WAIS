import { API, graphqlOperation } from 'aws-amplify';
import { createTrade as createTradeMutation } from '@/graphql/mutations';
import { getTrade as getTradeQuery } from '@/graphql/queries';
import { listTrades as listTradesQuery } from '@/graphql/queries';
import { v4 as uuid } from 'uuid';

export const trade = {
	namespaced: true,
	state: {
		trades: null,
	},
	mutations: {
		setTrades(state, payload) {
			state.trades = payload;
		}
	},
	actions: {
		async createTrade({ dispatch }, newTrade) {
			try {
				newTrade.id = uuid();
				await API.graphql(graphqlOperation(createTradeMutation, { input: newTrade }));
				dispatch("getTradesData");
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getTrade(_, id) {
			const trade = await API.graphql(graphqlOperation(getTradeQuery, { id: id }));
			return trade.data.getTrade;
		},
		async updateTrade(_, id) {
			const trade = await API.graphql(graphqlOperation(getTradeQuery, { id: id }));
			return trade.data.getTrade;
		},
		async getTradesData({ commit }) {
			const tradesData = await API.graphql(graphqlOperation(listTradesQuery));
			commit("setTrades", tradesData.data.listTrades.items);
		},
	},
	getters: {
		trades: (state) => state.trades
	}
}
