<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.auth.signInToYourWaisAccount') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form @submit.prevent="signIn">
				<mdb-input v-model="credentials.username" :label="$t('fields.username')" icon="user-circle" type="text" required class="mb-4" name="username" autocomplete="username" outline/>
				<mdb-input v-model="credentials.password" :label="$t('fields.password')" icon="lock" :type="passwordVisible ? 'text' : 'password'" required class="mb-3" name="password" autocomplete="current-password" outline>
					<mdb-btn @click.native="passwordVisible = !passwordVisible" :icon="passwordVisible ? 'eye-slash' : 'eye'" flat slot="append" class="p-0"/>
				</mdb-input>
				<span @click="$emit('auth-page-changed', 'forgotPassword')" class="a-tag d-block">{{ $t('views.auth.forgotYourPassword') }}</span>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('views.auth.signIn')" :loadingText="$t('views.auth.signingIn')" class="my-3"/>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr/>
					<p class="mt-4">
						<span>{{ $t('views.auth.dontHaveAnAccount') }} </span>
						<span @click="$emit('auth-page-changed', 'signUp')" class="a-tag">{{ $t('views.auth.createAccount') }}</span>
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
		name: 'signIn',
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
				},
				error: {},
				passwordVisible: false,
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
					this.loading = false;
				}
			},
		},
	};
</script>
