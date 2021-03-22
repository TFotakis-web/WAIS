<template>
	<ion-grid fixed>
		<ion-row class="ion-justify-content-center">
			<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
				<ion-card>
					<ion-card-header>
						<ion-card-title>{{ $t('views.auth.resetYourPassword') }}</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<form v-if="!showVerificationForm" @submit.prevent="forgotPassword">
							<ion-item>
								<ion-icon :icon="ionicons.personOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.username') }}</ion-label>
								<ion-input v-model="username" type="text" name="username" autocomplete="username" required/>
							</ion-item>
							<div class="ion-margin-top">
								<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.sendCode')" :loadingText="$t('actions.sendingCode')" class="ion-margin-bottom"/>
								<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
								<hr class="ion-margin-vertical"/>
								<p>
									<router-link :to="{name: 'SignIn'}">{{ $t('views.auth.backToSignIn') }}</router-link>
								</p>
								<localeDropdown/>
							</div>
						</form>
						<form v-else-if="showVerificationForm" @submit.prevent="forgotPasswordSubmit">
							<ion-item>
								<ion-icon :icon="ionicons.qrCodeOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.verificationCode') }}</ion-label>
								<ion-input v-model="verificationCode" type="text" name="verificationCode" autocomplete="verificationCode" required/>
							</ion-item>
							<ion-item>
								<ion-icon :icon="ionicons.keyOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.newPassword') }}</ion-label>
								<ion-input v-model="newPassword" :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="new-password" required/>
								<ion-button @click="passwordVisible = !passwordVisible" slot="end" fill="clear" class="ion-align-self-center">
									<ion-icon slot="icon-only" :icon="passwordVisible ? ionicons.eyeOffOutline : ionicons.eyeOutline"/>
								</ion-button>
							</ion-item>
							<div class="ion-margin-top">
								<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="ion-margin-bottom"/>
								<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
								<hr class="ion-margin-vertical"/>
								<p>
									<router-link :to="{name: 'SignIn'}">{{ $t('views.auth.backToSignIn') }}</router-link>
								</p>
								<localeDropdown/>
							</div>
						</form>
					</ion-card-content>
				</ion-card>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import { mapActions } from 'vuex';
	import {
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonCardTitle,
		IonIcon,
		IonItem,
		IonLabel,
		IonButton,
		IonInput,
		IonGrid,
		IonRow,
		IonCol,
	} from '@ionic/vue';
	import { eyeOutline, eyeOffOutline, keyOutline, personOutline, qrCodeOutline } from 'ionicons/icons';
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'forgotPassword',
		components: {
			IonCard,
			IonCardHeader,
			IonCardContent,
			IonCardTitle,
			IonIcon,
			IonItem,
			IonLabel,
			IonButton,
			IonInput,
			IonGrid,
			IonRow,
			IonCol,
			localeDropdown,
			loadingBtn,
		},
		data() {
			return {
				loading: false,
				error: {},
				username: '',
				showVerificationForm: false,
				verificationCode: '',
				newPassword: '',
				passwordVisible: false,
				ionicons: {
					personOutline,
					keyOutline,
					eyeOutline,
					eyeOffOutline,
					qrCodeOutline,
				},
			};
		},
		methods: {
			...mapActions({
				forgotPasswordStore: 'auth/forgotPassword',
				forgotPasswordSubmitStore: 'auth/forgotPasswordSubmit',
			}),
			forgotPassword: async function () {
				this.loading = true;
				this.error = {};
				try {
					await this.forgotPasswordStore(this.username);
					this.showVerificationForm = true;
					this.loading = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
			forgotPasswordSubmit: async function () {
				this.loading = true;
				this.error = {};
				try {
					await this.forgotPasswordSubmitStore({
						username: this.username,
						code: this.verificationCode,
						password: this.newPassword,
					});
					await this.$router.push({ name: 'SignIn' });
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
