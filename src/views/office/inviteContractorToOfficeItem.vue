<template>
	<ion-item @click="$router.push({name: 'InviteContractorToOfficeItemDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.inviteContractorToOffice') }}</h3>
			<p>{{ request.receiverEmail }}</p>
<!--			<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>-->
		</ion-label>
		<ion-badge color="warning">Pending</ion-badge>
	</ion-item>
</template>
<script>
	export default {
		name: 'inviteContractorToOfficeItem',
		props: ['request'],
	};
</script>
