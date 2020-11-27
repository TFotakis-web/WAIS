<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.auth.createANewWaisAccount') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form @submit.prevent="confirmSignUp">
				<mdb-input
					v-model="credentials.username"
					:label="$t('fields.username')"
					icon="user-circle"
					type="text"
					required
					name="username"
					autocomplete="username"
					disabled
				/>
				<mdb-input
					v-model="verificationCode"
					:label="$t('fields.verificationCode')"
					icon="qrcode"
					type="text"
					required
					class="mb-3"
					name="verificationCode"
					autocomplete="verificationCode"
				/>
				<span v-if="!resendLoading" @click="resendSignUp" class="a-tag">{{ $t('actions.resendVerificationCode') }}</span>
				<span v-else>{{ $t('actions.resendVerificationCode') }}</span>
				<div class="text-center">
					<mdb-btn v-if="!loading" color="primary" type="submit" rounded class="my-4">{{ $t('actions.submit') }}</mdb-btn>
					<mdb-btn v-else color="primary" rounded disabled class="my-4">
						<span class="spinner-border spinner-border-sm mr-1" />
						<span>{{ $t('actions.submitting') }}</span>
					</mdb-btn>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr />
					<p class="mt-4">
						<span>{{ $t('views.auth.haveAnAccount') }} </span>
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('views.auth.signIn') }}</span>
					</p>
					<localeDropdown />
				</div>
			</form>
		</mdb-card-body>
	</mdb-card>
</template>

<script>
	import { mapActions } from 'vuex';
	import localeDropdown from '@/components/structure/localeDropdown';

	export default {
		name: 'confirmSignUp',
		components: {
			localeDropdown,
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
			confirmSignUp: async function() {
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
			resendSignUp: async function() {
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
