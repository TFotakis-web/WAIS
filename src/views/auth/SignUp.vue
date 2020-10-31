<template>
	<div>
		<h1>Sign Up</h1>
		<login />

		<form v-if="confirmPassword" @submit.prevent="login">
			<mdb-input
				v-model="username"
				:label="$t('Username')"
				icon="user-circle"
				type="text"
				required
				class="mb-5"
			/>
			<mdb-input
				v-model="password"
				:label="$t('Password')"
				icon="lock"
				type="password"
				required
			/>
			<div class="text-center">
				<mdb-btn color="primary" type="submit" rounded class="mb-4">{{
					$t('Login')
				}}</mdb-btn>
			</div>
		</form>
		<div class="text-red-600">{{ error.message }}</div>
	</div>
</template>

<script>
import Login from '@/components/auth/login.vue';

export default {
	name: "SignUp",
	components: {
		Login
	},
	data: () => ({
		username: "",
		password: "",
		email: "",
		error: "",
		confirmPassword: false,
		code: "",
	}),
	methods: {
		async signUp() {
			if (!this.email || !this.password) {
				return;
			}
			try {
				await this.$store.dispatch("auth/signUp", {
					username: this.username,
					password: this.password,
					email: this.email
				});
				this.confirmPassword = true;
			} catch (error) {
				console.error(error);
				this.error = error;
			}
		},
		async confirmSignUp() {
			if (!this.username || !this.code) {
				return;
			}

			try {
				const { username, password, code } = this;
				await this.$store.dispatch("auth/confirmSignUp", {
					username,
					code
				});
				await this.$store.dispatch("authlogin", {
					username,
					password
				});
				this.router.push("/");
			} catch (error) {
				console.error(error);
				this.error = error;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
