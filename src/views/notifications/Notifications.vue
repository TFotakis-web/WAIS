<template>
	<ion-grid fixed>
		<ion-list>
			<ion-item v-for="request in $store.getters['request/requests']" :key="request.id" @click="$router.push({name: $store.getters['auth/isAdmin'] ? 'AdminNotificationDetails' : 'OfficeCreationForm', params: {id: request.id}})" button>
				<ion-label v-if="request.type === 'CREATE_OFFICE'">
					<h3>{{ $t('requests.createOffice') }}</h3>
					<p>{{ request.payload.createOfficePayload.officeName }} • {{ request.senderUsername }}</p>
				</ion-label>
				<ion-label v-if="request.type === 'CREATE_OFFICE_CONNECTION'">
					<h3>{{ $t('requests.createOfficeConnection') }}</h3>
					<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
				</ion-label>
				<ion-label v-if="request.type === 'INVITE_EMPLOYEE_TO_OFFICE'">
					<h3>{{ $t('requests.inviteEmployeeToOffice') }}</h3>
					<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
				</ion-label>
				<ion-label v-if="request.type === 'INVITE_CONTRACTOR_TO_OFFICE'">
					<h3>{{ $t('requests.inviteContractorToOffice') }}</h3>
					<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
				</ion-label>
			</ion-item>
		</ion-list>
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
