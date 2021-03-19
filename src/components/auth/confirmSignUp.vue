<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.auth.createANewWaisAccount') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form @submit.prevent="confirmSignUp">
				<!-- <mdb-input v-model="credentials.username" :label="$t('fields.username')" icon="user-circle" type="text" required name="username" autocomplete="username" disabled class="mb-4" outline/> -->
				<mdb-input v-model="verificationCode" :label="$t('fields.verificationCode')" icon="qrcode" type="text" required class="mb-3" outline/>
				<span v-if="!resendLoading" @click="resendSignUp" class="a-tag">{{ $t('actions.resendVerificationCode') }}</span>
				<span v-else>{{ $t('actions.resendVerificationCode') }}</span>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="my-3"/>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr/>
					<p class="mt-4">
						<span>{{ $t('views.auth.haveAnAccount') }} </span>
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('views.auth.signIn') }}</span>
					</p>
					<localeDropdown/>
				</div>
			</form>
		</mdb-card-body>
	</mdb-card>
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
					await this.signInStore(this.credentials);
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
