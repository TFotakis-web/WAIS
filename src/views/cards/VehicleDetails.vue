<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<!--	<div class="text-center pt-5">
				<h1>{{ $t('views.Vehicle Cards Details.pageTitle') }}</h1>
				<h5 class="text-info">{{ $t('various.underConstruction') }}</h5>
				<span>{{ vehicle }}</span>
			</div>-->
	</ion-grid>
</template>
<script>
	export default {
		name: 'VehicleDetails',
		data() {
			return {
				vehicle: {},
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Vehicle Cards Details.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
			// this.getVehicle();
		},
		methods: {
			getVehicle: async function () {
				this.vehicle = await this.$store.dispatch('vehicle/getVehicle', this.vehicleId);
				console.log(this.vehicle);
			},
		},
		computed: {
			vehicleId() {
				return this.$route.params.id;
			},
		},
	};
</script>
