<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-segment v-model="selectedView">
			<ion-segment-button value="employee">
				<ion-label>{{ $t('fields.roles.employee' )}}</ion-label>
			</ion-segment-button>
			<ion-segment-button value="partner">
				<ion-label>{{ $t('fields.roles.partner' )}}</ion-label>
			</ion-segment-button>
		</ion-segment>

		<invite-employee-card v-if="selectedView === 'employee'"/>
		<invite-partner-card v-if="selectedView === 'partner'"/>
	</ion-grid>
</template>
<script>
	import InviteEmployeeCard from '@/views/office/inviteEmployeeCard';
	import InvitePartnerCard from '@/views/office/invitePartnerCard';
	export default {
		name: 'ContractApproval',
		components: { InvitePartnerCard, InviteEmployeeCard },
		data() {
			return {
				selectedView: 'employee',
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('components.navigation.navbar-item.collaboration'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
