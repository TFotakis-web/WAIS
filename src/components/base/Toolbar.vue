<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button v-show="!$store.getters['pageStructure/pageBackButton']"/>
				<ion-back-button :default-href="$store.getters['pageStructure/backButtonDefaultHref']" v-if="$store.getters['pageStructure/pageBackButton']"/>
			</ion-buttons>
			<ion-title>{{ $store.getters['pageStructure/pageTitle']() }}</ion-title>
			<ion-buttons slot="end">
				<slot name="actions-end"/>
				<ion-menu-toggle menu="end">
					<ion-button>
						<ion-icon slot="icon-only" :icon="$ionicons.ellipsisVerticalOutline"/>
					</ion-button>
				</ion-menu-toggle>
				<ion-button v-for="route in $store.getters['platformData/sidenavRight']" :key="route.name" class="ion-hide-lg-down">
					<ion-icon slot="icon-only" :icon="route.icon"/>
				</ion-button>
				<ion-button @click="toggleTheme" class="ion-hide-lg-down">
					<ion-icon slot="icon-only" :icon="$ionicons.moonOutline"/>
				</ion-button>
				<locale-dropdown :no-label="true" class="topLevelRoute ion-hide-lg-down"/>
				<ion-button @click="signOut" class="ion-hide-lg-down">
					<ion-icon slot="icon-only" :icon="$ionicons.logOutOutline"/>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>
<script>
	import LocaleDropdown from '@/components/structure/localeDropdown';
	import { mapActions } from 'vuex';


	export default {
		name: 'Toolbar',
		components: { LocaleDropdown },
		data() {
			return {
				colorTheme: this.$cookies.get('color-theme') || 'light',
			};
		},
		mounted() {
			this.setColorTheme();
		},
		methods: {
			toggleTheme() {
				this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
				this.setColorTheme();
			},
			setColorTheme() {
				document.body.setAttribute('color-theme', this.colorTheme);
				this.$cookies.set('color-theme', this.colorTheme);
			},
			...mapActions('auth', ['signOut']),
		},
	};
</script>
