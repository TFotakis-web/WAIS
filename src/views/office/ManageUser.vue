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
				<ion-badge v-if="user.state === 'pending'" color="warning">{{ $t('actions.pending') }}</ion-badge>
				<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" @click="deleteUser" fill="clear" slot="end" color="danger">
					<ion-icon :icon="$ionicons.trashOutline" slot="start"/>
					<span>{{ $t('actions.delete') }}</span>
				</ion-button>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="save">
					<ion-input-item v-model="user.permissions" :config="$inputConfigs.permissions"/>
					<div class="ion-margin-top">
						<loading-btn type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import LoadingBtn from '@/components/structure/loadingBtn';


	export default {
		name: 'ManageUser',
		components: { IonInputItem, LoadingBtn },
		data() {
			return {
				loading: false,
				user: {},
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.manageUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);

			const i = this.username.replace('user', '');
			this.user = {
				profilePicture: this.$store.getters['platformData/defaultProfilePicture'],
				fullName: `Name${i} Surname${i}`,
				username: this.username,
				role: i % 2 === 0 ? 'Employee' : 'Contractor',
				state: i % 3 === 0 ? 'pending' : undefined,
				permissions: [],
			};
		},
		methods: {
			save() {
				this.loading = true;
				this.$toast.saveSuccess();
				this.loading = false;
			},
			deleteUser() {
				console.log('Delete user.');
			},
		},
		computed: {
			username() {
				return this.$route.params.username;
			},
		},
	};
</script>

