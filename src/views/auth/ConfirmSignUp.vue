<template>
	<ion-page>
		<ion-content>
			<ion-grid fixed>
				<ion-row class="ion-justify-content-center">
					<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
						<ion-card>
							<ion-card-header>
								<ion-card-title>{{ $t('views.auth.confirmSignUp') }}</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<form @submit.prevent="confirmSignUp">
									<ion-item>
										<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.username') }}</ion-label>
										<ion-input v-model="credentials.username" type="text" name="username" autocomplete="username" required/>
									</ion-item>
									<ion-item>
										<ion-icon :icon="$ionicons.qrCodeOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.verificationCode') }}</ion-label>
										<ion-input v-model="verificationCode" type="text" required/>
									</ion-item>
									<ion-button :disabled="resendLoading" @click="resendSignUp" fill="outline" color="medium">{{ $t('actions.resendVerificationCode') }}</ion-button>
									<div class="ion-margin-top">
										<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="ion-margin-bottom"/>
										<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
										<hr class="ion-margin-vertical"/>
										<p>
											<span>{{ $t('views.auth.haveAnAccount') + ' ' }}</span>
											<router-link :to="{ name: 'SignIn' }">{{ $t('views.auth.signIn') }}</router-link>
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
	import { mapActions } from 'vuex';
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'confirmSignUp',
		components: {
			localeDropdown,
			loadingBtn,
		},
		props: {
			credentials: {
				type: Object,
				default: () => ({
					username: '',
					password: '',
				}),
			},
		},
		data() {
			return {
				verificationCode: '',
				resendLoading: false,
				loading: false,
				error: {},
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => this.$t('views.auth.confirmSignUp'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		methods: {
			...mapActions({
				confirmSignUpStore: 'auth/confirmSignUp',
				resendSignUpStore: 'auth/resendSignUp',
				signInStore: 'auth/signIn',
			}),
			confirmSignUp: async function () {
				this.loading = true;
				this.error = {};
				try {
					await this.confirmSignUpStore({
						username: this.credentials.username,
						code: this.verificationCode,
					});
					// await this.signInStore(this.credentials);
					await this.$router.push({ name: 'SignIn' });
					this.loading = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
			resendSignUp: async function () {
				this.resendLoading = true;
				try {
					await this.resendSignUpStore(this.credentials.username);
					setTimeout(() => {
						this.resendLoading = false;
					}, 10000);
				} catch (error) {
					this.error = error;
					this.resendLoading = false;
				}
			},
		},
	};
</script>
