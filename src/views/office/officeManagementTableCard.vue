<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.officeManagementTableCard.cardTitle') }}</ion-card-title>
			<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" :router-link="{name: 'InviteOffice'}" fill="clear" slot="end">
				<ion-icon :icon="$ionicons.addOutline" slot="start"/>
				<span>{{ $t('actions.invite') }}</span>
			</ion-button>
		</ion-item>
		<ion-card-content>
			<ion-item v-for="office in offices" :key="office.name" :router-link="{name: 'ManageOffice', params: {id: office.id}}" button>
				<ion-avatar slot="start">
					<ion-img :src="office.office_logo"/>
				</ion-avatar>
				<ion-label>
					<h3>{{ office.name }}</h3>
					<p>{{ office.managerUsername }} • {{ office.address }}</p>
				</ion-label>
				<ion-badge v-if="office.state === 'pending'" color="warning">Pending</ion-badge>
			</ion-item>
		</ion-card-content>
	</ion-card>
</template>
<script>
	export default {
		name: 'officeManagementTableCard',
		data() {
			return {
				offices: (() => {
					const arr = [];
					for (let i = 0; i < 5; i++) {
						arr.push({
							id: i,
							name: `Office${i}`,
							managerUsername: `Manager${i}`,
							address: `Address${i}`,
							state: i % 3 === 0 ? 'pending' : undefined,
							office_logo: this.$store.getters['platformData/defaultOfficeLogo'],
						});
					}
					return arr;
				})(),
			};
		},
	};
</script>
