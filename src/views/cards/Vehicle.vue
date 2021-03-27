<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<!--	<div class="text-center pt-5">
				<h1>{{ $t('components.navigation.sidenav.cards.vehicleCards') }}</h1>
				<h5 class="text-info">{{ $t('various.underConstruction') }}</h5>
				<mdb-container>
					<mdb-row>
						<mdb-col>
							<mdb-input v-model="numberPlate" label="Vehicle Name"/>
							<mdb-btn @click="createVehicle">Save</mdb-btn>
						</mdb-col>
					</mdb-row>
					<mdb-row>
						<mdb-col>
							<mdb-list-group>
								<mdb-list-group-item
									v-for="(vehicle, index) in vehicles"
									:key="index"
									@click="openVehicleDetail(vehicle)"
									:justify-content-between="false"
									action
								>
									<span>{{ vehicle.numberPlate }}</span>
								</mdb-list-group-item>
							</mdb-list-group>
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</div>-->
	</ion-grid>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'VehicleCards',
		data() {
			return {
				numberPlate: '',
				error: '',
			};
		},
		mounted: function () {
			this.$store.commit('pageStructure/setPageTitle', () => this.$t('components.navigation.sidenav.cards.vehicleCards'));
			this.$store.commit('pageStructure/setPageBackButton', false);
			// this.$store.dispatch('vehicle/getVehiclesData');
		},
		methods: {
			openVehicleDetail(vehicle) {
				this.$router.push({ name: 'VehicleCardsDetails', params: { id: vehicle.id } });
			},
			createVehicle: async function () {
				this.error = '';
				if (!this.numberPlate) {
					this.error = 'Pleas enter a vehicle name';
					return;
				}
				const newVehicle = {
					// id: this.numberPlate,
					numberPlate: this.numberPlate,
					color: 'red',
					manufacturer: 'VW',
					model: 'Polo',
					owner: this.user.username,
					trim: 'Hatchback',
					fuelType: 'Petrol',
					usage: 'personal',
					displacement: 1238,
					eurotax: 5,
					firstRegistrationDate: '2010-03-05',
					passengers: 5,
					purchaseDate: '2010-03-05',
					taxableHorsepower: 75,
					vin: '1234567890',
					value: 5000,
					// file: {
					// name: '',
					// url: '',
					// },
					// createdAt: '',
					// updatedAt: '',
				};
				this.$store.dispatch('vehicle/createVehicle', newVehicle);
			},
		},
		computed: {
			...mapGetters({
				user: 'auth/user',
				vehicles: 'vehicle/vehicles',
			}),
		},
	};
</script>
