<template>
	<IonSplitPane content-id="main-content">
		<side-navigation/>
		<ion-page id="main-content">
			<toolbar :page-title="$store.getters['pageStructure/pageTitle']" :show-back-button="$store.getters['pageStructure/pageBackButton']" :back-button-default-href="$store.getters['pageStructure/backButtonDefaultHref']"/>
			<ion-content :fullscreen="true">
				<router-view/>
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
				default: ''
			}
		}
	};
</script>
