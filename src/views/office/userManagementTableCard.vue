<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.userManagementTableCard.cardTitle') }}</ion-card-title>
			<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" :router-link="{name: 'InviteUser'}" fill="clear" slot="end">
				<ion-icon :icon="$ionicons.addOutline" slot="start"/>
				<span>{{ $t('actions.invite') }}</span>
			</ion-button>
		</ion-item>
		<ion-card-content>
			<ion-list>
				<ion-list-header>
					<h2>{{ $t('fields.employees') }}</h2>
				</ion-list-header>
				<ion-item v-if="requestsForInviteEmployeeToOfficeSent.length === 0 && employees.length === 0">
					<ion-text>{{ $t('fields.noEmployees') }}</ion-text>
				</ion-item>
				<invite-employee-to-office-item v-for="request in requestsForInviteEmployeeToOfficeSent" :key="request.id" :request="request"/>
				<ion-item v-for="user in employees" :key="user.username" :router-link="{name: 'ManageUser', params: {username: user.username}}" button>
					<ion-avatar slot="start">
						<ion-img :src="user.profilePicture"/>
					</ion-avatar>
					<ion-label>
						<h3>{{ user.fullName }}</h3>
						<p>{{ user.username }} • {{ user.role }}</p>
					</ion-label>
					<ion-badge v-if="user.state === 'pending'" color="warning">Pending</ion-badge>
				</ion-item>
			</ion-list>
			<ion-list>
				<ion-list-header>
					<h2>{{ $t('fields.contractors') }}</h2>
				</ion-list-header>
				<ion-item v-if="requestsForInviteContractorToOfficeSent.length === 0 && contractors.length === 0">
					<ion-text>{{ $t('fields.noContractors') }}</ion-text>
				</ion-item>
				<invite-contractor-to-office-item v-for="request in requestsForInviteContractorToOfficeSent" :key="request.id" :request="request"/>
				<ion-item v-for="user in contractors" :key="user.username" :router-link="{name: 'ManageUser', params: {username: user.username}}" button>
					<ion-avatar slot="start">
						<ion-img :src="user.profilePicture"/>
					</ion-avatar>
					<ion-label>
						<h3>{{ user.fullName }}</h3>
						<p>{{ user.username }} • {{ user.role }}</p>
					</ion-label>
					<ion-badge v-if="user.state === 'pending'" color="warning">Pending</ion-badge>
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import { mapGetters } from 'vuex';
	import InviteEmployeeToOfficeItem from '@/views/office/inviteEmployeeToOfficeItem';
	import InviteContractorToOfficeItem from '@/views/office/inviteContractorToOfficeItem';

	export default {
		name: 'userManagementTableCard',
		components: { InviteContractorToOfficeItem, InviteEmployeeToOfficeItem },
		mounted() {
			this.$store.dispatch('office/getEmployeeUserProfiles');
			this.$store.dispatch('office/getContractorUserProfiles');
		},
		computed: {
			...mapGetters('office', ['employees', 'contractors']),
			...mapGetters('request', ['requestsForInviteEmployeeToOfficeSent', 'requestsForInviteContractorToOfficeSent']),
		},
	};
</script>
