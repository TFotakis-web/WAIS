<template>
	<ion-split-pane content-id="main-content">
		<side-navigation/>
		<ion-page id="main-content">
			<toolbar/>
			<ion-content :fullscreen="true">
				<ion-refresher slot="fixed" @ionRefresh="$router.go(0)">
					<ion-refresher-content>
					</ion-refresher-content>
				</ion-refresher>
				<ion-loading :is-open="$store.getters['pageStructure/routerViewPendingPromises']"/>
				<router-view v-slot="{ Component }" v-show="$store.getters['pageStructure/routerViewPendingPromises'] === 0">
					<transition name="route" mode="out-in">
						<component :is="Component"/>
					</transition>
				</router-view>
			</ion-content>
		</ion-page>
	</ion-split-pane>
</template>
<script>
	import SideNavigation from '@/components/base/SideNavigation';
	import Toolbar from '@/components/base/Toolbar';

	export default {
		name: 'BaseLayout',
		components: {
			SideNavigation,
			Toolbar,
		},
		props: {
			pageTitle: {
				type: String,
				default: '',
			},
		},
	};
</script>
<style>
	.route-enter-from {
		opacity: 0;
		transform: translateY(5px) scale(0.995);
		zoom: 0.5;
	}

	.route-enter-active {
		transition: all 200ms ease-out;
	}

	.route-leave-active {
		transition: all 200ms ease-in;
	}

	.route-leave-to {
		opacity: 0;
		transform: translateY(5px) scale(0.995);
	}
</style>
