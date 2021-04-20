<template>
	<ion-item @click="$router.push({name: 'CreateOfficeConnectionNotificationDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.createOfficeConnection') }}</h3>
			<p>{{ request.payload.createOfficeConnectionPayload.manager_email }} • {{ request.senderUsername }}</p>
		</ion-label>
	</ion-item>
</template>
<script>
	export default {
		name: 'createOfficeConnectionNotification',
		props: ['request'],
	};
</script>
