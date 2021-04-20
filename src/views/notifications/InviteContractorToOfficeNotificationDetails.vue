<template>
	<ion-grid fixed>
		<ion-label>
			<h3>{{ $t('requests.inviteContractorToOffice') }}</h3>
			<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
		</ion-label>
		<p>{{ request.payload.inviteContractorToOfficePayload }}</p>
	</ion-grid>
</template>
<script>
	export default {
		name: 'InviteContractorToOfficeNotificationDetails',
		data() {
			return {
				request: {},
			};
		},
		async created() {
			const requestId = this.$route.params.id;
			this.request = Object.assign({}, this.$store.getters['request/requestById'](requestId));

			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Notifications' }).fullPath);
		},
	};
</script>
