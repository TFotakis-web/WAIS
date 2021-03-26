<template>
	<ion-page>
		<ion-content>
			<ion-grid fixed>
				<ion-row class="ion-justify-content-center">
					<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
						<ion-card>
							<ion-card-header>
								<ion-card-title>{{ $t('views.auth.signInToYourWaisAccount') }}</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<form @submit.prevent="signIn">
									<ion-item>
										<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.username') }}</ion-label>
										<ion-input v-model="credentials.username" type="text" name="username" autocomplete="username" required/>
									</ion-item>
									<ion-item>
										<ion-icon :icon="$ionicons.keyOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.password') }}</ion-label>
										<ion-input v-model="credentials.password" :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="current-password" required/>
										<ion-button @click="passwordVisible = !passwordVisible" slot="end" fill="clear" class="ion-align-self-center">
											<ion-icon slot="icon-only" :icon="passwordVisible ? ionicons.eyeOffOutline : ionicons.eyeOutline"/>
										</ion-button>
									</ion-item>
									<router-link :to="{ name: 'ForgotPassword' }" class="ion-margin-vertical">{{ $t('views.auth.forgotYourPassword') }}</router-link>
									<div class="ion-margin-top">
										<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('views.auth.signIn')" :loadingText="$t('views.auth.signingIn')" class="ion-margin-bottom"/>
										<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
										<hr class="ion-margin-vertical"/>
										<p>
											<span>{{ $t('views.auth.dontHaveAnAccount') + ' ' }}</span>
											<router-link :to="{ name: 'SignUp' }">{{ $t('views.auth.createAccount') }}</router-link>
										</p>
										<localeDropdown/>
									</div>
								</form>
							</ion-card-content>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>
<script>
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
	import { eyeOutline, eyeOffOutline, keyOutline, personOutline } from 'ionicons/icons';

	import { mapActions } from 'vuex';
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'signIn',
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
				credentials: {
					username: '',
					password: '',
				},
				error: {},
				passwordVisible: false,
				ionicons: {
					personOutline,
					keyOutline,
					eyeOutline,
					eyeOffOutline,
				},
			};
		},
		methods: {
			...mapActions({
				signInStore: 'auth/signIn',
			}),
			signIn: async function () {
				this.loading = true;
				this.error = {};
				try {
					await this.signInStore(this.credentials);
					await this.$router.push({ name: 'Home' });
				} catch (error) {
					if (error.name === 'UserNotConfirmedException') {
						this.$emit('auth-page-changed', 'confirmSignUp');
						this.$emit('auth-credentials', {
							username: this.credentials.username,
							password: this.credentials.password,
						});
					} else if (error.name === 'NEW_PASSWORD_REQUIRED') {
						this.$emit('auth-page-changed', 'forceChangePassword');
						this.$emit('auth-credentials', {
							username: this.credentials.username,
							password: this.credentials.password,
						});
					}
					this.error = error;
				} finally {
					this.loading = false;
				}
			},
		},
	};
</script>
