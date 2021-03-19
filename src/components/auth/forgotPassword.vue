<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.auth.resetYourPassword') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form v-if="!showVerificationForm" @submit.prevent="forgotPassword">
				<mdb-input v-model="username" :label="$t('fields.username')" icon="user-circle" type="text" required class="mb-3" name="username" autocomplete="username" outline/>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('actions.sendCode')" :loadingText="$t('actions.sendingCode')" class="my-3"/>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr/>
					<p class="mt-4">
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('views.auth.backToSignIn') }}</span>
					</p>
					<localeDropdown/>
				</div>
			</form>
			<form v-else-if="showVerificationForm" @submit.prevent="forgotPasswordSubmit">
				<mdb-input v-model="verificationCode" :label="$t('fields.verificationCode')" icon="qrcode" type="text" required class="mb-3" name="verificationCode" autocomplete="verificationCode" outline/>
				<mdb-input v-model="newPassword" :label="$t('fields.newPassword')" icon="lock" :type="passwordVisible ? 'text' : 'password'" required class="mb-3" name="password" autocomplete="new-password" outline>
					<mdb-btn @click="passwordVisible = !passwordVisible" :icon="passwordVisible ? 'eye-slash' : 'eye'" flat slot="append" class="p-0"/>
				</mdb-input>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="my-3"/>
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr/>
					<p class="mt-4">
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('views.auth.backToSignIn') }}</span>
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
		name: 'forgotPassword',
		components: {
			localeDropdown,
			loadingBtn,
		},
		data() {
			return {
				loading: false,
				error: {},
				username: '',
				showVerificationForm: false,
				verificationCode: '',
				newPassword: '',
				passwordVisible: false,
			};
		},
		methods: {
			...mapActions({
				forgotPasswordStore: 'auth/forgotPassword',
				forgotPasswordSubmitStore: 'auth/forgotPasswordSubmit',
			}),
			forgotPassword: async function () {
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
			forgotPasswordSubmit: async function () {
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
