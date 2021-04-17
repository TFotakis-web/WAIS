<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-card>
			<ion-item lines="full">
				<ion-card-title>{{ $t('views.Office.inviteUser.pageTitle') }}</ion-card-title>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="inviteUser">
					<ion-item>
						<ion-label position="floating">{{ $t('fields.role') }}</ion-label>
						<ion-select v-model="user.role" required interface="popover">
							<ion-select-option v-for="o in roleOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
						</ion-select>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="user.email" type="email" name="email" autocomplete="email" required/>
					</ion-item>
					<div class="ion-margin-top">
						<loadingBtn type="submit" :loading="loading" :text="$t('actions.invite')" :loadingText="$t('actions.inviting')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'InviteUser',
		components: {
			loadingBtn,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.inviteUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
		},
		data() {
			return {
				user: {
					role: '',
					email: '',
				},
				loading: false,
			};
		},
		methods: {
			inviteUser() {
				this.loading = true;
				console.log('Invited user.');
				this.loading = false;
			},
		},
		computed: {
			roleOptions() {
				return [
					{ text: this.$t('fields.roles.employee'), value: 'Employee' },
					{ text: this.$t('fields.roles.contractor'), value: 'Contractor' },
				];
			},
		},
	};
</script>

