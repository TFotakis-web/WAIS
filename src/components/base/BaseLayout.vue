<template>
	<IonSplitPane content-id="main-content">
		<side-navigation/>
		<ion-page id="main-content">
			<toolbar :page-title="$store.getters['pageStructure/pageTitle']" :show-back-button="$store.getters['pageStructure/pageBackButton']" :back-button-default-href="$store.getters['pageStructure/backButtonDefaultHref']"/>
			<ion-content :fullscreen="true">
				<router-view v-slot="{ Component }">
					<transition name="route" mode="out-in">
						<component :is="Component"/>
					</transition>
				</router-view>
			</ion-content>
		</ion-page>
	</IonSplitPane>
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
