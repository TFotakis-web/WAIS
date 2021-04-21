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
					<h3>{{ $t('fields.employees') }}</h3>
				</ion-list-header>
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
					<h3>{{ $t('fields.contractors') }}</h3>
				</ion-list-header>
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

	export default {
		name: 'userManagementTableCard',
		mounted() {
			this.$store.dispatch('office/getEmployeeUserProfiles');
			this.$store.dispatch('office/getContractorUserProfiles');
		},
		computed: {
			...mapGetters('office', ['employees', 'contractors'])
		}
	};
</script>
