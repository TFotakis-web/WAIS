<template>
	<div class="text-center pt-5">
		<h1>{{ $t('views.Vehicle Cards Details.pageTitle') }}</h1>
		<h5 class="text-info">{{ $t('various.underConstruction') }}</h5>
		<span>{{ vehicle }}</span>
	</div>
</template>

<script>
	export default {
		name: 'VehicleDetails',
		data() {
			return {
				vehicle: {}
			}
		},
		mounted () {
			this.getVehicle();
		},
		methods: {
			getVehicle: async function() {
				this.vehicle = await this.$store.dispatch('vehicle/getVehicle', this.vehicleId);
				console.log(this.vehicle);
			}
		},
		computed: {
			vehicleId() {
				return this.$route.params.id;
			}
		},
	};
</script>
