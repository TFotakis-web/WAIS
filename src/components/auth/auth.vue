<template>
	<div>
		<fullScreenSpinner v-if="loading" />
		<template v-else>
			<SignIn v-if="authPage === 'signIn'" @auth-page-changed="(value) => (authPage = value)" @auth-credentials="(value) => (credentials = value)" />
			<ForgotPassword v-else-if="authPage === 'forgotPassword'" @auth-page-changed="(value) => (authPage = value)" />
			<SignUp v-else-if="authPage === 'signUp'" @auth-page-changed="(value) => (authPage = value)" @auth-credentials="(value) => (credentials = value)" />
			<ConfirmSignUp v-else-if="authPage === 'confirmSignUp'" @auth-page-changed="(value) => (authPage = value)" :credentials="credentials" />
		</template>
	</div>
</template>

<script>
	import fullScreenSpinner from '@/components/structure/fullScreenSpinner';
	import SignIn from '@/components/auth/signIn';
	import ForgotPassword from '@/components/auth/forgotPassword';
	import SignUp from '@/components/auth/signUp';
	import ConfirmSignUp from '@/components/auth/confirmSignUp';

	export default {
		name: 'auth',
		components: {
			fullScreenSpinner,
			SignIn,
			ForgotPassword,
			SignUp,
			ConfirmSignUp,
		},
		data() {
			return {
				authPage: 'signIn',
				credentials: {},
				loading: true,
			};
		},
		created() {
			this.loading = true;
			this.$store.dispatch('auth/currentUserInfo').then(() => (this.loading = false));
		},
	};
</script>
