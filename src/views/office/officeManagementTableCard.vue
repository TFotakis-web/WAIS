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
			<ion-list>
				<ion-item v-if="partnerOffices.length === 0">
					<ion-text>{{ $t('fields.noPartnerOffices') }}</ion-text>
				</ion-item>
				<ion-item v-for="office in partnerOffices" :key="office.name" :router-link="{name: 'ManageOffice', params: {id: office.id}}" button>
					<!--			<ion-item v-for="office in offices" :key="office.name" :router-link="{name: 'ManageOffice', params: {id: office.id}}" button>-->
					<ion-avatar slot="start">
						<s3-ion-img :s3-object="office.office_logo" :default-url="$store.getters['platformData/defaultOfficeLogo']"/>
					</ion-avatar>
					<ion-label>
						<p>{{ office }}</p>
						<!--					<h3>{{ office.name }}</h3>-->
						<!--					<p>{{ office.managerUsername }} • {{ office.address }}</p>-->
					</ion-label>
					<!--				<ion-badge v-if="office.state === 'pending'" color="warning">Pending</ion-badge>-->
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import { mapGetters } from 'vuex';
	import S3IonImg from '@/components/structure/S3IonImg';

	export default {
		name: 'officeManagementTableCard',
		components: { S3IonImg },
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
							office_logo: {},
						});
					}
					return arr;
				})(),
			};
		},
		mounted() {
			this.$store.dispatch('office/getPartnerOfficeConnectionsForOfficeId', this.myOffice.id);
		},
		computed: {
			...mapGetters('office', ['myOffice', 'partnerOffices']),
		},
	};
</script>
