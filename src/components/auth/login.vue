<template>
	<div>
		<!-- <form class="flex flex-col items-center" @submit.prevent="login">
			<div class="flex flex-col user">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="userName"
					>User Name</label
				>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					v-model="username"
					id="userName"
				/>
			</div>
			<div class="flex flex-col mt-10">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="password"
					>Password</label
				>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					v-model="password"
				/>
			</div> -->
		<!-- eslint-disable -->
		<!-- <button class="btn-blue">Sign in</button>
		</form>
		<div class="text-red-600">{{ error.message }}</div> -->

		<form @submit.prevent="login">
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
				<mdb-btn
					color="primary"
					type="submit"
					rounded
					class="mb-4"
					>{{ $t("Login") }}</mdb-btn
				>
			</div>
		</form>
		<div class="text-red-600">{{ error.message }}</div>

		<!-- <div id="login" class="centered-block container">
			<mdb-col sm="10" md="8" lg="6" class="mx-auto">
				<mdb-card v-if="!passreset">
					<mdb-card-header class="blue-gradient m-0">
						<mdb-row class="d-flex justify-content-center">
							<h3 class="white-text m-0 p-5 font-weight-bold">
								{{ $t("Login to WAIS") }}
							</h3>
						</mdb-row>
					</mdb-card-header>
					<mdb-card-body class="px-5">
						<form @submit.prevent="login">
							<mdb-input
								v-model="credentials.username"
								:label="$t('Username')"
								icon="user-circle"
								type="text"
								required
								class="mb-5"
							/>
							<mdb-input
								v-model="credentials.password"
								:label="$t('Password')"
								icon="lock"
								type="password"
								required
							/>
							<div class="text-right mb-3">
								<a href="#" @click.prevent="passreset = true">{{
									$t("Forgot your password?")
								}}</a>
							</div>
							<div class="text-center">
								<mdb-btn
									v-if="!loading"
									color="primary"
									type="submit"
									rounded
									class="mb-4"
									>{{ $t("Login") }}</mdb-btn
								>
								<mdb-btn
									v-else
									color="primary"
									rounded
									disabled
									class="mb-4"
								>
									<span
										class="spinner-border spinner-border-sm mr-1"
									/>
									<span>{{ $t("Logging in...") }}</span>
								</mdb-btn>
								<hr />
								<p class="mt-4">
									<span
										>{{ $t("Don't have an account?") }}
									</span>
									<router-link
										:to="{
											name: 'Register',
											query: { next: $route.query.next },
										}"
										>{{ $t("Register") }}</router-link
									>
								</p>
								<a
									href="#"
									@click.prevent="$root.changeLanguage()"
								>
									<mdb-icon icon="globe" class="mr-1" />
									<strong>{{
										this.$i18n.locale === "en" ? "GR" : "EN"
									}}</strong>
								</a>
							</div>
						</form>
					</mdb-card-body>
				</mdb-card>

				<mdb-card v-else>
					<mdb-card-header class="blue-gradient m-0">
						<mdb-row class="d-flex justify-content-center">
							<h3 class="white-text m-0 p-5 font-weight-bold">
								{{ $t("Reset your password") }}
							</h3>
						</mdb-row>
					</mdb-card-header>
					<mdb-card-body class="px-5">
						<div v-if="!passresetsuccess">
							<form @submit.prevent="reqPassResetToken">
								<mdb-input
									v-model="resetemail"
									:isValid="resetemailvalid"
									@change="validatePasswordResetForm()"
									:label="$t('Email')"
									icon="envelope"
									type="email"
									required
									class="mb-5"
								/>
								<div class="text-center">
									<mdb-btn
										v-if="!loading"
										color="primary"
										type="submit"
										rounded
										class="mb-3"
										>{{ $t("reset") }}</mdb-btn
									>
									<mdb-btn
										v-else
										color="primary"
										rounded
										disabled
										class="mb-3"
									>
										<span
											class="spinner-border spinner-border-sm mr-1"
										/>
									</mdb-btn>
									<mdb-btn
										color="primary"
										@click="passreset = false"
										rounded
										class="mb-3"
										>{{ $t("back") }}</mdb-btn
									>
								</div>
							</form>
						</div>

						<div v-else class="text-center">
							<h5 class="title mb-2">Check you inbox.</h5>
							<h5 class="form-text">
								We have sent you a reset link.
							</h5>
							<mdb-btn
								v-if="!loading"
								@click="reqPassResetToken()"
								color="primary"
								rounded
								class="mb-3"
								>{{ $t("resend email") }}</mdb-btn
							>
							<mdb-btn
								v-else
								color="primary"
								rounded
								disabled
								class="mb-3"
							>
								<span
									class="spinner-border spinner-border-sm mr-1"
								/>
							</mdb-btn>
							<mdb-btn
								color="primary"
								@click="
									passreset = false;
									passresetsuccess = false;
								"
								rounded
								class="mb-3"
								>{{ $t("continue") }}</mdb-btn
							>
						</div>

						<hr />
						<div class="text-center">
							<a href="#" @click.prevent="$root.changeLanguage()">
								<mdb-icon icon="globe" class="mr-1" />
								<strong>{{
									this.$i18n.locale === "en" ? "GR" : "EN"
								}}</strong>
							</a>
						</div>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
			<div class="text-red-600">{{ error.message }}</div>
		</div> -->
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: "login",
	data: () => ({
		username: "",
		password: "",
		email: "",
		error: "",
	}),
	methods: {
		...mapActions({
			loginVue: "auth/login"
		}),
		async login() {
			try {
				await this.loginVue({
					username: this.username,
					password: this.password
				});
			} catch (error) {
				this.error = error;
			}
		}
	}
};
</script>

<style scoped>
</style>
