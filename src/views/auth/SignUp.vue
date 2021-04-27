<template>
	<ion-page>
		<ion-content>
			<ion-grid fixed>
				<ion-row class="ion-justify-content-center">
					<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
						<ion-card>
							<ion-card-header>
								<ion-card-title>{{ $t('views.auth.createANewWaisAccount') }}</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<form @submit.prevent="signUp">
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
											<ion-icon slot="icon-only" :icon="passwordVisible ? $ionicons.eyeOffOutline : $ionicons.eyeOutline"/>
										</ion-button>
									</ion-item>
									<ion-item>
										<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
										<ion-input v-model="credentials.email" type="email" name="email" autocomplete="email" required/>
									</ion-item>
									<ion-row class="ion-align-items-end">
										<ion-col>
											<ion-item>
												<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
												<ion-label position="floating">{{ $t('fields.countryCode') }}</ion-label>
												<ion-select v-model="selectedTelephoneCode" :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')">
													<ion-select-option v-for="o in telephoneCodeOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
												</ion-select>
											</ion-item>
										</ion-col>
										<ion-col>
											<ion-item>
												<ion-label position="floating">{{ $t('fields.phoneNumber') }}</ion-label>
												<ion-input v-model="phone_number" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
											</ion-item>
										</ion-col>
									</ion-row>
									<div class="ion-margin-top">
										<loading-btn color="primary" expand="block" type="submit" :loading="loading" :text="$t('views.auth.signUp')" :loadingText="$t('views.auth.signingUp')" class="ion-margin-bottom"/>
										<p v-if="error !== {}" class="text-danger"><strong>{{ error.message }}</strong></p>
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
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';
	import { mapGetters } from 'vuex';

	export default {
		name: 'signUp',
		components: {
			localeDropdown,
			loadingBtn,
		},
		data() {
			return {
				loading: false,
				credentials: {
					username: '',
					password: '',
					email: '',
					phone_number: '',
				},
				phone_number: '',
				selectedTelephoneCode: '+30',
				error: {},
				passwordVisible: false,
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.auth.createANewWaisAccount'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		methods: {
			signUp: async function () {
				this.loading = true;
				this.error = {};
				this.credentials.phone_number = this.selectedTelephoneCode + this.phone_number.toString();
				try {
					await this.$store.dispatch('auth/signUp', this.credentials);
					await this.$router.push({ name: 'ConfirmSignUp' });
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
		computed: {
			...mapGetters('platformData', ['telephoneCodeOptions']),
		},
	};
</script>
