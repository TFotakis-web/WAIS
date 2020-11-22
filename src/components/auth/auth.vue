<template>
	<div>
		<SignIn v-if="authPage === 'signIn'" @auth-page-changed="value => (authPage = value)" @auth-credentials="value => (credentials = value)"/>
		<ForgotPassword v-else-if="authPage === 'forgotPassword'" @auth-page-changed="value => (authPage = value)" />
		<SignUp v-else-if="authPage === 'signUp'" @auth-page-changed="value => (authPage = value)" @auth-credentials="value => (credentials = value)"/>
		<ConfirmSignUp v-else-if="authPage === 'confirmSignUp'" @auth-page-changed="value => (authPage = value)" :credentials="credentials" />
	</div>
</template>

<script>
	import SignIn from '@/components/auth/signIn';
	import ForgotPassword from '@/components/auth/forgotPassword';
	import SignUp from '@/components/auth/signUp';
	import ConfirmSignUp from '@/components/auth/confirmSignUp';
	export default {
		name: 'auth',
		components: {
			SignIn,
			ForgotPassword,
			SignUp,
			ConfirmSignUp
		},
		data() {
			return {
				authPage: 'signIn',
				credentials: {}
			};
		},
	};
</script>
