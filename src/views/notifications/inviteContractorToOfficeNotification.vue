<template>
	<ion-item @click="$router.push({name: 'InviteContractorToOfficeNotificationDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.inviteContractorToOffice') }}</h3>
			<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
		</ion-label>
	</ion-item>
</template>
<script>
	export default {
		name: 'inviteContractorToOfficeNotification',
		props: ['request'],
	};
</script>
