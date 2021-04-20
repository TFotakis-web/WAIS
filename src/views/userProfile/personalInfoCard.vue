<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>{{ $t('fields.personalInfo') }}</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<form @submit.prevent="save">
				<ion-list>
					<ion-item>
						<ion-avatar class="ion-margin-end">
							<s3-ion-img :s3-object="userProfile.profilePicture" :default-url="$store.getters['platformData/defaultProfilePicture']"/>
						</ion-avatar>
						<file-input color="primary" :text="$t('actions.edit')" rename-to="profile" file-path="profile" level="protected" v-model="userProfile.profilePicture" :sizeLimitInMBs="10" size="small"/>
					</ion-item>
					<ion-row>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.family_name') }}</ion-label>
								<ion-input v-model="userProfile.family_name" type="text" name="fname" autocomplete="family-name" required/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start" class="ion-hide-md-up"/>
								<ion-label position="floating">{{ $t('fields.name') }}</ion-label>
								<ion-input v-model="userProfile.name" type="text" name="name" autocomplete="given-name" required/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start" class="ion-hide-md-up"/>
								<ion-label position="floating">{{ $t('fields.fathersName') }}</ion-label>
								<ion-input v-model="userProfile.fathers_name" type="text" name="name" autocomplete="additional-name" required/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-item>
						<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
						<ion-input v-model="userProfile.tin" type="text" name="tin"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="userProfile.email" type="email" name="email" autocomplete="email" required/>
					</ion-item>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
								<ion-input v-model="userProfile.mobile" type="number" name="mobile" autocomplete="tel" class="no-arrows"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
								<ion-input v-model="userProfile.telephone" type="number" name="phone" autocomplete="tel" class="no-arrows"/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
								<ion-input v-model="userProfile.address" type="text" name="address" autocomplete="street-address"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start"/>
								<ion-label position="floating">{{ $t('fields.city') }}</ion-label>
								<ion-input v-model="userProfile.city" type="text" name="city" autocomplete="address-level2"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start"/>
								<ion-label position="floating">{{ $t('fields.zip_code') }}</ion-label>
								<ion-input v-model="userProfile.zip_code" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
							</ion-item>
						</ion-col>
					</ion-row>
				</ion-list>
				<div class="ion-margin-top">
					<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
				</div>
			</form>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import loadingBtn from '@/components/structure/loadingBtn';
	import fileInput from '@/components/structure/fileInput/fileInput';
	import S3IonImg from '@/components/structure/S3IonImg';

	export default {
		name: 'personalInfoCard',
		components: {
			S3IonImg,
			loadingBtn,
			fileInput
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
				// let userProfile = {
				// 	id: this.userProfile.id,
				// 	username: this.userProfile.username,
				// 	name: this.userProfile.name,
				// 	family_name: this.userProfile.family_name,
				// 	fathers_name: this.userProfile.fathers_name,
				// 	tin: this.userProfile.tin,
				// 	email: this.userProfile.email,
				// 	telephone: this.userProfile.telephone,
				// 	mobile: this.userProfile.mobile,
				// 	address: this.userProfile.address,
				// 	city: this.userProfile.city,
				// 	zip_code: this.userProfile.zip_code,
				// 	locale: this.userProfile.locale,
				// 	profilePicture: this.userProfile.profilePicture,
				// };
				// this.updateUserProfile(userProfile)
				this.updateUserProfile()
					.then(() => this.$toast.saveSuccess())
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
		computed: {
			...mapGetters('auth', ['userProfile']),
		},
	};
</script>
