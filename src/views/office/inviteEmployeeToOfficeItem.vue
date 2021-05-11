<template>
	<ion-item @click="$router.push({name: 'InviteEmployeeToOfficeItemDetails', params: {id: request.id}})" button>
		<ion-label>
			<h3>{{ $t('requests.inviteEmployeeToOffice') }}</h3>
			<p>{{ request.receiverEmail }}</p>
		</ion-label>
		<ion-badge color="warning">{{ $t('actions.pending') }}</ion-badge>
	</ion-item>
</template>
<script>
	export default {
		name: 'inviteEmployeeToOfficeItem',
		props: ['request'],
	};
</script>
