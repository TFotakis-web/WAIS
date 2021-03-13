<template>
	<div id="app" v-if="appSystemsLoaded && $store.getters.localesLoaded">
		<fullScreenSpinner v-show="$store.getters.globalPendingPromises > 0"/>
		<mdb-container v-if="!this.$store.getters['auth/user']" fluid style="height: 100vh">
			<mdb-row class="h-100 justify-content-center align-items-center">
				<mdb-col sm="10" md="6" lg="6" xl="4">
					<auth/>
					<!-- <amplify-authenticator/> -->
				</mdb-col>
			</mdb-row>
		</mdb-container>
		<template v-else-if="$store.getters.globalPendingPromises === 0">
			<tradeCreationForm v-if="showTradeCreationForm"/>
			<navigation v-else/>
			<!--			<navigation/>-->
		</template>
	</div>
</template>
<script>
	import navigation from '@/components/structure/navigation'
	import auth from '@/components/auth/auth'
	import fullScreenSpinner from '@/components/structure/fullScreenSpinner'
	import TradeCreationForm from '@/components/structure/tradeCreationForm/tradeCreationForm.vue'

	export default {
		name: 'App',
		components: {
			navigation,
			auth,
			fullScreenSpinner,
			TradeCreationForm,
		},
		data() {
			return {
				appSystemsLoaded: false,
			}
		},
		mounted() {
			this.appSystemsLoaded = true
		},
		computed: {
			showTradeCreationForm() {
				if (this.$store.getters['auth/isAdmin']) return false;
				let flag = this.$store.getters['auth/userProfile'].tradeCon.items === undefined;
				flag |= this.$store.getters['auth/userProfile'].tradeCon.items.length === 0;
				return flag;
			}
		},
	}
</script>
<style>
	/* @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"); */

	html {
		font-size: 16px;
		width: 100%;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	button,
	a,
	ul,
	li {
		font-family: var(--amplify-font-family);
		/* font-family: "Roboto", "Arial", "Calibri"; */
	}

	body {
		font-weight: 300;
		background-color: #fafafa !important;
		/* background-color: #eee !important; */
	}

	main {
		min-height: 90vh;
	}

	.fixed-sn footer {
		padding-left: 0;
	}

	.side-nav .logo-sn {
		padding-bottom: 1rem;
		padding-top: 1rem;
		border-bottom: 1px solid rgba(153, 153, 153, 0.3);
	}

	.navbar .btn,
	.navbar .nav-item,
	.navbar .nav-link {
		padding: 0;
	}

	.select-wrapper input.select-dropdown {
		font-size: 14px;
	}

	.form-control {
		font-size: 14px;
	}

	.cascading-admin-card {
		margin-top: 20px;
	}

	.cascading-admin-card .admin-up {
		margin-left: 4%;
		margin-right: 4%;
		margin-top: -20px;
	}

	.cascading-admin-card .admin-up .fas,
	.cascading-admin-card .admin-up .far,
	.cascading-admin-card .admin-up .fab {
		padding: 1.7rem;
		font-size: 2rem;
		color: #fff;
		text-align: left;
		-webkit-border-radius: 3px;
		border-radius: 3px;
	}

	.cascading-admin-card .admin-up .data {
		float: right;
		margin-top: 2rem;
		text-align: right;
	}

	.cascading-admin-card .admin-up .data p {
		color: #999999;
		font-size: 12px;
	}

	.classic-admin-card .card-body {
		color: #fff;
		margin-bottom: 0;
		padding: 0.9rem;
	}

	.classic-admin-card .card-body p {
		font-size: 13px;
		opacity: 0.7;
		margin-bottom: 0;
	}

	.classic-admin-card .card-body h4 {
		margin-top: 10px;
	}

	.classic-admin-card .card-body .float-right .fas,
	.classic-admin-card .card-body .float-right .far,
	.classic-admin-card .card-body .float-right .fab {
		font-size: 3rem;
		opacity: 0.5;
	}

	.table-ui {
		border: 1px solid #e0e0e9;
	}

	.fullscreen {
		background: #fff;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 100000;
		min-height: 100vh;
	}

	.fullscreen-view {
		height: 100vh;
	}

	.form-control {
		height: calc(2rem + 1px);
		padding: 0.375rem 0.75rem;
	}

	.list-group .ml-auto {
		float: right;
		flex: none !important;
	}

	.datepicker-overlay {
		z-index: 9999 !important;
	}

	.navbar-brand {
		cursor: pointer;
	}

	.clickable {
		cursor: pointer;
	}

	.a-tag {
		color: #007bff;
		text-decoration: none;
		cursor: pointer;
		background-color: transparent;
		-webkit-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
	}

	.a-tag:hover {
		color: #0056b3;
		text-decoration: underline;
		-webkit-transition: all 0.2s ease-in-out;
		transition: all 0.2s ease-in-out;
	}

	.breadcrumb-with-arrows .breadcrumb-item + .breadcrumb-item::before {
		font-family: 'Font Awesome 5 Free';
		font-weight: 900;
		content: '\f0da';
	}

	.fadingSlide-enter-active,
	.fadingSlide-leave-active {
		transition: opacity 0.1s, transform 0.1s;
	}

	.fadingSlide-enter,
	.fadingSlide-leave-to {
		opacity: 0;
		transform: translateY(0.25%);
	}

	.md-form {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}

	.nav-link {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

	.no-arrows input::-webkit-outer-spin-button,
	.no-arrows input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.no-arrows input[type=number] {
		-moz-appearance:textfield; /* Firefox */
	}

  .modal {
    z-index: 1070;
  }
</style>
