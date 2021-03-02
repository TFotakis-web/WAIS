<template>
	<div class="text-center pt-5">
		<h1>{{ $t('views.notifications.pageTitle') }}</h1>
		<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
		</mdb-container>
	</div>
</template>
<script>
	import { mapActions } from "vuex";

	export default {
		name: "Notifications",
		mounted() {
			this.listRequestsByReceiverEmail("wais@admin.com")
			.then((response) => {
				console.log(response);
			});
		},
		methods: {
			...mapActions('request', ['listRequestsByReceiverEmail'])
		},
	}
</script>
<style scoped>
</style>