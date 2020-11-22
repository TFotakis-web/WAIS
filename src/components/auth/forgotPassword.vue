<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('Reset your password') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form v-if="!showVerificationForm" @submit.prevent="forgotPassword">
				<mdb-input
					v-model="username"
					:label="$t('Username')"
					icon="user-circle"
					type="text"
					required
					class="mb-3"
					name="username"
					autocomplete="username"
				/>
				<div class="text-center">
					<mdb-btn v-if="!loading" color="primary" type="submit" rounded class="my-4">{{ $t('Send code') }}</mdb-btn>
					<mdb-btn v-else color="primary" rounded disabled class="my-4">
						<span class="spinner-border spinner-border-sm mr-1" />
						<span>{{ $t('Sending code...') }}</span>
					</mdb-btn>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr />
					<p class="mt-4">
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('Back to Sign In') }}</span>
					</p>
					<localeDropdown />
				</div>
			</form>

			<form v-else-if="showVerificationForm" @submit.prevent="forgotPasswordSubmit">
				<mdb-input
					v-model="verificationCode"
					:label="$t('Verification Code')"
					icon="qrcode"
					type="text"
					required
					class="mb-3"
					name="verificationCode"
					autocomplete="verificationCode"
				/>
				<mdb-input
					v-model="newPassword"
					:label="$t('New password')"
					icon="lock"
					type="password"
					required
					class="mb-3"
					name="password"
					autocomplete="new-password"
				/>
				<div class="text-center">
					<mdb-btn v-if="!loading" color="primary" type="submit" rounded class="my-4">{{ $t('Submit') }}</mdb-btn>
					<mdb-btn v-else color="primary" rounded disabled class="my-4">
						<span class="spinner-border spinner-border-sm mr-1" />
						<span>{{ $t('Submitting...') }}</span>
					</mdb-btn>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr />
					<p class="mt-4">
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('Back to Sign In') }}</span>
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
		name: 'forgotPassword',
		components: {
			localeDropdown,
		},
		data() {
			return {
				loading: false,
				error: {},
				username: '',
				showVerificationForm: false,
				verificationCode: '',
				newPassword: '',
			};
		},
		methods: {
			...mapActions({
				forgotPasswordStore: 'auth/forgotPassword',
				forgotPasswordSubmitStore: 'auth/forgotPasswordSubmit',
			}),
			forgotPassword: async function() {
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
			forgotPasswordSubmit: async function() {
				this.loading = true;
				this.error = {};
				try {
					await this.forgotPasswordSubmitStore({
						username: this.username,
						code: this.verificationCode,
						password: this.newPassword,
					});
					this.$emit('auth-page-changed', 'signIn');
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
