<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('Sign in to your WAIS account') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form @submit.prevent="signIn">
				<mdb-input v-model="credentials.username" :label="$t('Username')" icon="user-circle" type="text" required class="mb-5" name="username" autocomplete="username"/>
				<mdb-input v-model="credentials.password" :label="$t('Password')" icon="lock" type="password" required class="mb-2" name="password" autocomplete="current-password"/>
				<span @click="$emit('auth-page-changed', 'forgotPassword')" class="a-tag">{{ $t('Forgot your password?') }}</span>
				<div class="text-center">
					<mdb-btn v-if="!loading" color="primary" type="submit" rounded class="my-4">{{ $t('Sign In') }}</mdb-btn>
					<mdb-btn v-else color="primary" rounded disabled class="mb-4">
						<span class="spinner-border spinner-border-sm mr-1" />
						<span>{{ $t('Signing in...') }}</span>
					</mdb-btn>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr />
					<p class="mt-4">
						<span>{{ $t("Don't have an account?") }} </span>
						<span @click="$emit('auth-page-changed', 'signUp')" class="a-tag">{{ $t('Create account') }}</span>
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
		name: 'signIn',
		components: {
			localeDropdown,
		},
		data() {
			return {
				loading: false,
				credentials: {
					username: '',
					password: '',
				},
				error: {}
			};
		},
		methods: {
			...mapActions({
				signInStore: 'auth/signIn',
			}),
			signIn: async function() {
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
					}
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
