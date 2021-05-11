<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>{{ $t('fields.personalInfo') }}</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<form @submit.prevent="save">
				<ion-list>
					<ion-input-item v-model="userProfile.profilePicture" :config="$inputConfigs.profilePicture" input-group="userProfile"/>
					<ion-row>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="userProfile.family_name" :config="$inputConfigs.family_name" input-group="userProfile"/>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="userProfile.name" :config="$inputConfigs.name" icon-classes="ion-hide-md-up" input-group="userProfile"/>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="userProfile.fathers_name" :config="$inputConfigs.fathers_name" icon-classes="ion-hide-md-up" input-group="userProfile"/>
						</ion-col>
					</ion-row>
					<ion-input-item v-model="userProfile.tin" :config="$inputConfigs.tin" input-group="userProfile"/>
					<ion-input-item v-model="userProfile.email" :config="$inputConfigs.email" input-group="userProfile"/>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="userProfile.mobile" :config="$inputConfigs.mobile" input-group="userProfile"/>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="userProfile.telephone" :config="$inputConfigs.phone" input-group="userProfile"/>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="8">
							<ion-input-item v-model="userProfile.address" :config="$inputConfigs.address" input-group="userProfile"/>
						</ion-col>
						<!--						<ion-col size="12" size-md="4">-->
						<!--							<ion-input-item v-model="userProfile.city" :config="$inputConfigs.city" input-group="userProfile"/>-->
						<!--						</ion-col>-->
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="userProfile.zip_code" :config="$inputConfigs.zip_code" input-group="userProfile"/>
						</ion-col>
					</ion-row>
				</ion-list>
				<div class="ion-margin-top">
					<loading-btn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
				</div>
			</form>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import { mapActions, mapGetters } from 'vuex';
	import loadingBtn from '@/components/structure/loadingBtn';


	export default {
		name: 'personalInfoCard',
		components: {
			IonInputItem,
			loadingBtn,
		},
		data() {
			return {
				loading: false,
			};
		},
		methods: {
			...mapActions('auth', ['updateUserProfile']),
			save() {
				this.loading = true;
				this.updateUserProfile()
					.then(() => {
						this.$toast.saveSuccess();
						this.$mitt.emit('markInputClean:userProfile');
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
		computed: {
			...mapGetters('auth', ['userProfile']),
		},
	};
</script>
