<template>
	<ion-app v-if="loading === 0">
		<router-view/>
	</ion-app>
</template>
<script>
	import { IonApp } from '@ionic/vue';

	export default {
		name: 'App',
		components: {
			IonApp,
		},
		data() {
			return {
				loading: 0,
			};
		},
		created: async function () {
			this.initLocale();
			// Todo: Enable loadEnumData
			// this.loadEnumData();
			window.WaisVue = this;
		},
		methods: {
			loadEnumData: function () {
				this.$store.dispatch('platformData/getPlatformData');
			},
			initLocale: function () {
				this.loading++;
				const userLang =
					this.$cookies.get('locale') ||
					navigator.language ||
					navigator.userLanguage;
				this.$i18n.$loadLanguageAsync(userLang)
					.then(() => {
						this.loading--;
					});
			},
		},
	};
</script>
<style>
	input:-webkit-autofill {
		height: 0;
		-webkit-box-shadow:0 0 0 10px white inset;
		-webkit-text-fill-color: black;
		font-weight: 500;
	}

	input:-webkit-autofill:focus {
		height: 0;
		-webkit-box-shadow: 0 0 0 10px white inset;
		-webkit-text-fill-color: black;
		font-weight: 500;
	}

	hr {
		background-color: var(--ion-color-medium);
	}

	a {
		display: inline-block;
		text-decoration: none;
	}

	.no-arrows input::-webkit-outer-spin-button,
	.no-arrows input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.no-arrows input[type=number] {
		-moz-appearance:textfield; /* Firefox */
	}
</style>
