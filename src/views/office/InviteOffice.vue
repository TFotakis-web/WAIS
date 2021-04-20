<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-card-title>{{ $t('views.Office.inviteOffice.pageTitle') }}</ion-card-title>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="inviteOffice">
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="form.manager_email" type="email" name="email" autocomplete="email" required/>
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
		name: 'InviteOffice',
		components: {
			loadingBtn,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.inviteOffice.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
		},
		data() {
			return {
				form: {
					manager_email: '',
				},
				loading: false,
			};
		},
		methods: {
			inviteOffice() {
				this.loading = true;
				this.$store.dispatch('request/createOfficeConnectionRequest', this.form)
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Office' });
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
	};
</script>

