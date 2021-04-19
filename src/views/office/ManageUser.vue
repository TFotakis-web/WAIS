<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-avatar slot="start">
					<ion-img :src="user.profilePicture"/>
				</ion-avatar>
				<ion-label>
					<h3>{{ user.fullName }}</h3>
					<p>{{ user.username }} • {{ user.role }}</p>
				</ion-label>
				<ion-badge v-if="user.state === 'pending'" color="warning">Pending</ion-badge>
				<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" @click="deleteUser" fill="clear" slot="end" color="danger">
					<ion-icon :icon="$ionicons.trashOutline" slot="start"/>
					<span>{{ $t('actions.delete') }}</span>
				</ion-button>
			</ion-item>
			<ion-card-content>
				<ion-item v-if="$store.getters['auth/role'] === 'MANAGER'">
					<ion-label position="floating">{{ $t('fields.permissions') }}</ion-label>
					<ion-select v-model="user.permissions" multiple required>
						<ion-select-option v-for="o in permissionOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'ManageUser',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.manageUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);

			const i = this.username.replace('user', '');
			this.user = {
				profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
				fullName: `Name${i} Surname${i}`,
				username: this.username,
				role: i % 2 === 0 ? 'Employee' : 'Contractor',
				state: i % 3 === 0 ? 'pending' : undefined,
				permissions: [],
			};
		},
		data() {
			return {
				user: {},
			};
		},
		methods: {
			deleteUser() {
				console.log('Delete user.');
			},
		},
		computed: {
			username() {
				return this.$route.params.username;
			},
			...mapGetters('platformData', ['permissionOptions']),
		},
	};
</script>

