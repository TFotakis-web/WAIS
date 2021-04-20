<template>
	<ion-item @click="$router.push($store.getters['auth/isAdmin'] ? {name:  'AdminCreateOfficeNotificationDetails', params: {id: request.id}}  : {name: 'OfficeCreationForm'})" button>
		<ion-label>
			<h3>{{ $t('requests.createOffice') }}</h3>
			<p>{{ request.payload.createOfficePayload.officeName }} • {{ request.senderUsername }}</p>
		</ion-label>
	</ion-item>
</template>
<script>
	export default {
		name: 'createOfficeNotification',
		props: ['request'],
	};
</script>
