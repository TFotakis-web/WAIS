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
	});
</script>
