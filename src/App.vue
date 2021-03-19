<template>
	<ion-app v-if="loading === 0">
		<ion-router-outlet/>
	</ion-app>
</template>
<script>
	import { IonApp, IonRouterOutlet } from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet,
		},
		data() {
			return {
				loading: 1,
			};
		},
		mounted: function () {
			this.loading++;
			this.initLocale();
			this.loading--;
			this.loading--;
			console.log('tzanis 2');
			// setTimeout(() => {
			// 	this.loading--;
			// }, 5000);
			// Todo: Enable loadEnumData
			// this.loadEnumData();
		},
		methods: {
			loadEnumData: function () {
				this.$store.dispatch('platformData/getPlatformData');
			},
			initLocale: function () {
				const userLang =
					this.$cookies.get('locale') ||
					navigator.language ||
					navigator.userLanguage;
				this.$i18n.$loadLanguageAsync(userLang);
			},
		},
	});
</script>
