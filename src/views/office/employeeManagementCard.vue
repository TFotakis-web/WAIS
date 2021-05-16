<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.employeeManagementCard.cardTitle') }}</ion-card-title>
<!--			<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" :router-link="{name: 'InviteEmployee'}" fill="clear" slot="end">-->
<!--				<ion-icon :icon="$ionicons.addOutline" slot="start"/>-->
<!--				<span>{{ $t('actions.invite') }}</span>-->
<!--			</ion-button>-->
		</ion-item>
		<ion-card-content>
			<ion-list>
				<ion-item v-if="employees.length === 0">
					<ion-text>{{ $t('fields.noEmployees') }}</ion-text>
				</ion-item>
				<ion-item v-for="user in employees" :key="user.username" :router-link="{name: 'ManageUser', params: {username: user.username}}" button>
					<ion-avatar slot="start">
						<ion-img :src="user.profilePicture"/>
					</ion-avatar>
					<ion-label>
						<h3>{{ user.fullName }}</h3>
						<p>{{ user.username }} • {{ user.role }}</p>
					</ion-label>
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import { mapGetters } from 'vuex';


	export default {
		name: 'employeeManagementCard',
		computed: {
			...mapGetters('office', ['employees']),
		},
	};
</script>
