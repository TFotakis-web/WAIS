<template>
	<ion-grid fixed>
		<ion-card>
			<ion-card-header>
				<ion-card-title>Create Office requests</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<ion-list>
					<ion-item v-for="request in $store.getters['request/requestsForNewOfficeReceived']" :key="request.id" @click="$router.push({name: 'AdminNotificationDetails', params: {id: request.id}})" button>
						<strong>{{ request.payload.createOfficePayload.officeName }}</strong>
<!--						<strong>{{ request.payload.createOfficePayload.officeName }}: </strong>-->
<!--						<span>{{ request.payload.createOfficePayload.family_name + ' ' + request.payload.createOfficePayload.name + ' ' + request.payload.createOfficePayload.fathersName }}</span>-->
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	export default {
		name: 'Notifications',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
