<template>
	<ion-menu content-id="main-content" type="push">
		<ion-content>
			<ion-list>
				<side-navigation-category v-for="routeCategory in sidenavLeft" :key="routeCategory.name" :routeCategory="routeCategory"/>
			</ion-list>
		</ion-content>
	</ion-menu>

	<ion-menu content-id="main-content" type="push" side="end" class="ion-hide-lg-up">
		<ion-content>
			<ion-list>
				<side-navigation-category v-for="routeCategory in sidenavRight" :key="routeCategory.name" :routeCategory="routeCategory"/>
			</ion-list>
			<ion-list lines="none">
				<ion-item lines="none" class="topLevelRoute">
					<ion-icon slot="start" :icon="$ionicons.moonOutline"></ion-icon>
					<ion-label>{{ $t('components.base.sideNavigations.toggleDarkTheme')}}</ion-label>
					<ion-toggle id="themeToggle" slot="end" :checked="colorTheme === 'dark'" @ionChange="toggleTheme"/>
				</ion-item>
				<localeDropdown class="topLevelRoute"/>
				<ion-item lines="none" @click="signOut" button class="topLevelRoute">
					<ion-icon slot="start" :icon="$ionicons.logOutOutline"></ion-icon>
					<ion-label>{{ $t('components.navigation.navbar-item.signOut') }}</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>
<script>
	import SideNavigationCategory from '@/components/base/SideNavigationCategory';
	import localeDropdown from '@/components/structure/localeDropdown';

	import { mapActions, mapGetters } from 'vuex';


	export default {
		name: 'SideNavigation',
		components: {
			SideNavigationCategory,
			localeDropdown,
		},
		data() {
			return {
				shown: false,
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
		computed: {
			...mapGetters('platformData', ['sidenavLeft', 'sidenavRight'])
		},
	};
</script>
<style lang="scss">
	ion-menu {
		ion-content {
			--padding-start: 8px;
			--padding-end: 8px;
			--padding-top: 20px;
			--padding-bottom: 20px;
			--background: var(--ion-item-background, var(--ion-background-color, #fff));

			ion-list {
				padding: 20px 0;
				border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);

				ion-list-header {
					font-size: 22px;
					font-weight: 600;
					min-height: 20px;
					padding-left: 10px;
				}

				ion-item {
					--padding-start: 10px;
					--padding-end: 10px;
					border-radius: 4px;

					ion-icon {
						color: #616e7e;
					}

				}
			}
		}
	}

	.topLevelRoute ion-label {
		font-weight: 500;
	}
</style>
