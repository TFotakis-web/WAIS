<template>
	<ion-item @click="$router.push({name: 'InviteEmployeeToOfficeNotificationDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.inviteEmployeeToOffice') }}</h3>
			<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
		</ion-label>
	</ion-item>
</template>
<script>
	export default {
		name: 'inviteEmployeeToOfficeNotification',
		props: ['request'],
	};
</script>
