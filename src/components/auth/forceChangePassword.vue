<template>
	<mdb-card>
		<mdb-card-header class="blue-gradient m-0">
			<mdb-row class="d-flex justify-content-center">
				<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.auth.changeYourPassword') }}</h3>
			</mdb-row>
		</mdb-card-header>
		<mdb-card-body>
			<form @submit.prevent="completeNewPassword">
				<mdb-input v-model="newPassword" :label="$t('fields.newPassword')" icon="lock" :type="passwordVisible ? 'text' : 'password'" required class="mb-3" name="password" autocomplete="new-password" outline>
					<mdb-btn @click.native="passwordVisible = !passwordVisible" :icon="passwordVisible ? 'eye-slash' : 'eye'" flat slot="append" class="p-0"/>
				</mdb-input>
				<div class="text-center">
					<loadingBtn color="primary" type="submit" :rounded="true" :loading="loading" :text="$t('actions.submit')" :loadingText="$t('actions.submitting')" class="my-3" />
					<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
					<hr />
					<p class="mt-4">
						<span @click="$emit('auth-page-changed', 'signIn')" class="a-tag">{{ $t('views.auth.backToSignIn') }}</span>
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
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'forceChangePassword',
		components: {
			localeDropdown,
			loadingBtn
		},
		props: {
			credentials: {
				type: Object,
				default: () => {}
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
		methods: {
			...mapActions({
				completeNewPasswordStore: 'auth/completeNewPassword',
			}),
			completeNewPassword: async function() {
				this.loading = true;
				this.error = {};
				try {
					await this.completeNewPasswordStore({
						username: this.credentials.username,
						old_password: this.credentials.password,
						new_password: this.newPassword
					});
					this.loading = false;
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
