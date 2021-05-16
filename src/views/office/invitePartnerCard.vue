<template>
	<ion-card>
<!--		<ion-item lines="full">-->
<!--			<ion-card-title>{{ $t('views.Office.inviteOffice.pageTitle') }}</ion-card-title>-->
<!--		</ion-item>-->
		<ion-card-content>
			<form @submit.prevent="inviteOffice">
				<ion-input-item v-model="form.manager_email" :config="$inputConfigs.email"/>
				<div class="ion-margin-top">
					<loading-btn type="submit" :loading="loading" :text="$t('actions.invite')" :loadingText="$t('actions.inviting')"/>
				</div>
			</form>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import loadingBtn from '@/components/structure/loadingBtn';


	export default {
		name: 'invitePartnerCard',
		components: {
			IonInputItem,
			loadingBtn,
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
						this.$mitt.emit('markInputClean:all');
						this.$router.push({ name: 'Office' });
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
	};
</script>

