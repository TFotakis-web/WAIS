<template>
	<ion-grid fixed>
		<ion-list>
			<ion-item v-if="$store.getters['request/requestsForMe'].length === 0">
				<ion-text>{{ $t('views.notifications.noNewNotifications' )}}</ion-text>
			</ion-item>
			<template v-for="request in $store.getters['request/requestsForMe']" :key="request.id">
				<create-office-notification v-if="request.type === 'CREATE_OFFICE'" :request="request"/>
				<create-office-connection-notification v-if="request.type === 'CREATE_OFFICE_CONNECTION'" :request="request"/>
				<invite-employee-to-office-notification v-if="request.type === 'INVITE_EMPLOYEE_TO_OFFICE'" :request="request"/>
				<invite-contractor-to-office-notification v-if="request.type === 'INVITE_CONTRACTOR_TO_OFFICE'" :request="request"/>
			</template>
		</ion-list>
	</ion-grid>
</template>
<script>
	import CreateOfficeNotification from '@/views/notifications/createOfficeNotification';
	import CreateOfficeConnectionNotification from '@/views/notifications/createOfficeConnectionNotification';
	import InviteEmployeeToOfficeNotification from '@/views/notifications/inviteEmployeeToOfficeNotification';
	import InviteContractorToOfficeNotification from '@/views/notifications/inviteContractorToOfficeNotification';

	export default {
		name: 'Notifications',
		components: {
			InviteContractorToOfficeNotification,
			InviteEmployeeToOfficeNotification,
			CreateOfficeConnectionNotification,
			CreateOfficeNotification,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
