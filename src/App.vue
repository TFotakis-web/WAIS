<template>
	<ion-app v-if="loading === 0">
<!--		<ion-router-outlet/>-->
		<router-view/>
	</ion-app>
</template>
<script>
	import { IonApp } from '@ionic/vue';
	// import { IonRouterOutlet } from '@ionic/vue';

	export default {
		name: 'App',
		components: {
			IonApp,
			// IonRouterOutlet,
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
