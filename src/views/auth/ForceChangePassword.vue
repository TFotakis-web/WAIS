<template>
	<ion-page>
		<ion-content>
			<ion-grid fixed>
				<ion-row class="ion-justify-content-center">
					<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
						<ion-card>
							<ion-card-header>
								<ion-card-title>{{ $t('views.auth.changeYourPassword') }}</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<form @submit.prevent="completeNewPassword">
									<ion-item>
										<ion-icon :icon="$ionicons.keyOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.newPassword') }}</ion-label>
										<ion-input v-model="newPassword" :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="new-password" required/>
										<ion-button @click="passwordVisible = !passwordVisible" slot="end" fill="clear" class="ion-align-self-center">
											<ion-icon slot="icon-only" :icon="passwordVisible ? $ionicons.eyeOffOutline : $ionicons.eyeOutline"/>
										</ion-button>
									</ion-item>
									<div class="ion-margin-top">
										<loading-btn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="ion-margin-bottom"/>
										<p v-if="error !== {}" class="text-danger"><strong>{{ error.message }}</strong></p>
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
		</ion-content>
	</ion-page>
</template>
<script>
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'forceChangePassword',
		components: {
			localeDropdown,
			loadingBtn,
		},
		props: {
			credentials: {
				type: Object,
				default: () => {
				},
			},
		},
		data() {
			return {
				loading: false,
				error: {},
				newPassword: '',
				passwordVisible: false,
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.auth.changeYourPassword'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		methods: {
			completeNewPassword: async function () {
				this.loading = true;
				this.error = {};
				try {
					await this.$store.dispatch('auth/completeNewPassword', {
						username: this.credentials.username,
						old_password: this.credentials.password,
						new_password: this.newPassword,
					});
					await this.$router.push({ name: 'SignIn' });
					this.loading = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
