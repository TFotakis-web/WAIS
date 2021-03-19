<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>{{ $t('views.auth.signInToYourWaisAccount') }}</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<form @submit.prevent="signIn">
				<ion-item>
					<ion-icon :icon="personOutline" slot="start" align-self-center/>
					<ion-label position="floating">{{ $t('fields.username') }}</ion-label>
					<ion-input v-model="credentials.username" type="text" name="username" autocomplete="username" required/>
				</ion-item>
				<ion-item>
					<ion-icon :icon="keyOutline" slot="start" align-self-center/>
					<ion-label position="floating">{{ $t('fields.password') }}</ion-label>
					<ion-input v-model="credentials.password" :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="current-password" required/>
					<ion-button @click="passwordVisible = !passwordVisible" slot="end" fill="clear">
						<ion-icon slot="icon-only" :icon="passwordVisible ? eyeOffOutline : eyeOutline" align-self-center/>
					</ion-button>
				</ion-item>
				<ion-button :router-link="{ name: 'Home' }" fill="clear">{{ $t('views.auth.forgotYourPassword') }}</ion-button>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('views.auth.signIn')" :loadingText="$t('views.auth.signingIn')" class="my-3"/>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr/>
					<p class="mt-4"><span>{{ $t('views.auth.dontHaveAnAccount') }} </span>
						<ion-button :router-link="{ name: 'Home' }" fill="clear">{{ $t('views.auth.createAccount') }}</ion-button>
					</p><!-- <localeDropdown /> --></div>
			</form>
		</ion-card-content>
	</ion-card>
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
	} from '@ionic/vue';
	import { eyeOutline, eyeOffOutline, keyOutline, personOutline } from 'ionicons/icons';

	import { mapActions } from 'vuex';
	// import localeDropdown from "@/components/structure/localeDropdown";
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
			// localeDropdown,
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
				personOutline,
				keyOutline,
				eyeOutline,
				eyeOffOutline,
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
					this.$router.push({ name: 'Home' });
				}
			},
		},
	};
</script>
