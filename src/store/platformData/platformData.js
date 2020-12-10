import $http from "@/axios";
import $i18n from '@/i18n';

class TranslatableItem {
	constructor({ locales, translations }) {
		this._data = {};
		for (let i = 0; i < locales.length; i++) {
			this._data[locales[i]] = translations[i];
		}
	}

	get name() {
		return this._data[$i18n.locale];
	}
}

class TranslatableItemList {
	constructor(inputList, ItemClass) {
		if (ItemClass === undefined) {
			ItemClass = TranslatableItem;
		}
		this._list = [];
		for (const item of inputList) {
			this._list.push(new ItemClass(item))
		}
	}

	get list() {
		let list = [];
		for (const item of this._list) {
			list.push(item.name)
		}
		return list;
	}
}

class Vehicle {
	constructor({ type, manufacturer, model }) {
		this.type = type;
		this.manufacturer = manufacturer;
		this.model = model;
	}
}

class VehicleList {
	constructor(inputList) {
		this.list = [];
		this.byType = {};
		this.byManufacturer = {};
		for (let i = 0; i < inputList.length; i++) {
			let vehicle = new Vehicle(inputList[i]);
			this.list.push(vehicle);
			this.byType
		}
	}
}

class Postcode {
	constructor(district, city, code) {
		this.district = district;
		this.city = city;
		this.code = code;
	}

	toString() {
		return this.code.toString + ' ' + this.district + ' ' + this.city;
	}
}

class PostcodeList {
	constructor(list) {
		this.list = [];
		for (let i = 0; i < list.length; i++) {
			this.list.push(new Postcode(list[i]));
		}
	}
}


class Usage extends TranslatableItem {
	constructor(branch, locales, translations) {
		super(locales, translations);
		this.branch = branch;
	}
}

class UsageList extends TranslatableItemList {
	constructor(list) {
		super(list, Usage);
		// this.list = [];
		// for (let i = 0; i < list.length; i++) {
		// 	this.list.push(Usage(list[i]));
		// }
	}
}

class PlatformData {
	BranchesList = new TranslatableItemList([]);
	VehicleManufacturerList = []
	DOYList = new TranslatableItemList([]);
	VehicleList = new VehicleList([])
	PostcodeList = new PostcodeList([]);
	UsageList = new UsageList([]);
	DriversLicenseTypeList = new TranslatableItemList([]);
	FamilyStatusList = new TranslatableItemList([]);
	FuelTypeList = new TranslatableItemList([]);
	SecurityMeasureList = new TranslatableItemList([]);
	GenderList = new TranslatableItemList([]);
	VehicleColorList = new TranslatableItemList([]);
	VehicleTrimList = new TranslatableItemList([]);
	VehicleTypeList = new TranslatableItemList([]);

	constructor(data) {
		this.VehicleManufacturerList = data.Brands;
		this.DOYList = new TranslatableItemList(data.DOY);
		this.VehicleTypeList = new TranslatableItemList(data.VehicleTypes);
		console.log('PlatformData constructor', this);
	}
}

export const platformData = {
	namespaced: true,
	state: {
		data: null,
	},
	mutations: {
		setData(state, payload) {
			// state.data = payload;
			state.data = new PlatformData(payload);
		}
	},
	actions: {
		async createData({ dispatch }, newData) {
			try {
				console.log(newData);
				dispatch("getPlatformData");
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
		async getPlatformData({ commit }) {
			// $http.get('/enumData.json')
			// 	.then(res => {
			// 		commit("setData", res.data);
			// 	})
			// 	.catch(err => {
			// 		console.error(err);
			// 	});

			try {
				commit('increaseGlobalPendingPromises', null, { root: true });
				let res = await $http.get('/enumData.json');
				await commit("setData", res.data);
				commit('decreaseGlobalPendingPromises', null, { root: true });
				return Promise.resolve();
			} catch (error) {
				console.error(error);
				return Promise.reject(error);
			}
		},
	},
	getters: {
		data: (state) => state.data
	}
};
