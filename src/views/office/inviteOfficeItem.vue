<template>
	<ion-item @click="$router.push({name: 'InviteOfficeItemDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.inviteOffice') }}</h3>
			<p>{{ request.receiverEmail }}</p>
		</ion-label>
		<ion-badge color="warning">{{ $t('actions.pending') }}</ion-badge>
	</ion-item>
</template>
<script>
	export default {
		name: 'inviteOfficeItem',
		props: ['request'],
	};
</script>
